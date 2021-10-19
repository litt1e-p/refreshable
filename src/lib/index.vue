<template>
  <div class="rfa__">
    <div ref="sw1" class="rfa__wr" v-if="props.direction === 'vertical'" style="position: absolute;left: 0;top: 0;right: 0;bottom: 0;overflow: hidden;">
      <div class="rfa__scroll-content">
        <slot name="pulldown" v-bind:dto="{ isPullingdown: state.isPullingdown, isPullingdownDone: state.isPullingdownDone, indPer: state.indPer }">
          <div class="rfa__pulldown-wr" :class="{'rfa__pulldown-wr-ing': state.isPullingdown}" v-if="props.pulldown">
            <div class="rfa__before-trigger" v-if="!state.isPullingdown">
              <span>{{pulldownText}}</span>
            </div>
            <div class="rfa__after-trigger">
              <loading v-show="!isJustPulldown && state.isPullingdown" :text="pulldownText" :type="props.pulldown.img" v-model="state.isPullingdown"></loading>
              <ActivityIndicator v-show="isJustPulldown" class="rfa__ind rfa__ind_mn" ref="ind" v-model="state.indPer" :animate="state.isPullingdown"/>
            </div>
          </div>
        </slot>
        <div ref="slot1" :class="{'rfa__main-ing': state.isPullingdown, 'rfa__main': props.pulldown}">
          <slot></slot>
        </div>
        <slot name="pullup" v-bind:dto="{ isPullingup: state.isPullingup, isPullingupDone: state.isPullingupDone, hasMore: state.hasMore }">
          <div class="rfa__pullup-wr" v-if="props.pullup">
            <div class="rfa__before-trigger" v-if="!state.isPullingup">
              <span>{{pullupText}}</span>
            </div>
            <div class="rfa__after-trigger" v-show="state.isPullingup && state.hasMore">
              <loading :text="pullupText" :type="props.pullup.img" v-model="state.isPullingup"></loading>
            </div>
          </div>
        </slot>
      </div>
    </div>
    <div ref="sw2" class="rfah__wr" v-else-if="props.direction === 'horizontal'">
      <div class="rfa__scroll-content">
        <div ref="slot2" style="white-space: nowrap;overflow: hidden;">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'refreshable'
}
</script>

<script setup>

import { ref, reactive, computed, onMounted, onActivated, onBeforeUnmount, nextTick } from 'vue'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import PullUp from '@better-scroll/pull-up'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar' 
import NestedScroll from '@better-scroll/nested-scroll'
import Loading from './loading.vue'
import { ActivityIndicator } from 'activity-indicator'

BScroll.use(PullDown)
BScroll.use(PullUp)
BScroll.use(MouseWheel)
BScroll.use(ScrollBar)
BScroll.use(NestedScroll)

const rectf = function (el) {
  if (!el) {
    return {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    }
  }
  if (el instanceof window.SVGElement) {
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

const stringf = function (t) {
  return Object.prototype.toString.call(t)
}

const throttle = function(fn, delay) {
  let prev = new Date()
  return function () {
    const now = new Date()
    if (now - prev > delay) {
      fn.apply(this, arguments)
      prev = new Date()
    }
  }
}

const hash = function(px = '', n = 7) {
  return px + '-' + (Math.random() * 0xFFFFFF << n).toString(16)
}

const props = defineProps({
  probeType: {
    type: Number,
    default: 1
  },
  click: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    default: 'vertical' // horizontal
  },
  scrollbar: {
    type: null,
    default: false
  },
  startY: {
    type: Number,
    default: 0
  },
  startX: {
    type: Number,
    default: 0
  },
  freeScroll: {
    type: Boolean,
    default: false
  },
  observeScroll: {
    type: Boolean,
    default: false
  },
  observeBeforeScroll: {
    type: Boolean,
    default: false
  },
  observeScrollEnd: {
    type: Boolean,
    default: false
  },
  mouseWheel: {
    type: Boolean,
    default: false
  },
  pullup: {
    type: [Object, Boolean],
    default: false
  },
  pulldown: {
    type: [Object, Boolean],
    default: false
  },
  nestedScroll: {
    type: [Object, Boolean],
    default: false
  },
  eventPassthrough: {
    type: String,
    default: ''
  }
})

const sw1 = ref(null)
const sw2 = ref(null)
const slot1 = ref(null)
const slot2 = ref(null)
const ind = ref(null)

// sw1.value = hash('rfa__0x', 4)
// sw2.value = hash('rfa__0x', 4)
// slot1.value = hash('rfas__0x', 4)
// slot2.value = hash('rfas__0x', 4)

const state = reactive(
  {
    isPullingdown: false,
    isPrePullingdown: false,
    isPullingdownDone: false,
    isPullingup: false,
    isPullingupDone: false,
    hasMore: true,
    pullupLoad: void 0,
    pulldownLoad: void 0,
    indPer: 0.1,
    atLeast: 1000,
    startDown: 0,
    startUp: 0,
    sw1: void 0,
    sw2: void 0,
    slot1: void 0,
    slot2: void 0
  }
)

// @global vars
let scroll = void 0,
throttleActivityInspect = void 0,
indH = 0,
_throttleActivityInspect = void 0

// @emits
const emit = defineEmits(['scroll', 'beforeScrollStart', 'pullingUp', 'pullingDown', 'scrollEnd'])

// @computed
const pullupText = computed(() => {
  return !state.hasMore ? state.pullupLoad?.text?.noMore : state.isPullingup ? state.pullupLoad?.text?.loading : state.isPullingupDone ? state.pullupLoad?.text?.done : state.pullupLoad?.text?.normal
})
const pulldownText = computed(() => {
  return isJustPulldown ? void 0 : state.isPrePullingdown ? state.pulldownLoad?.text?.holding : state.isPullingdown ? state.pulldownLoad?.text?.loading : state.isPullingdownDone ? state.pulldownLoad?.text?.done : state.pulldownLoad?.text?.normal
})
const isJustPulldown = computed(() => {
  return props.pulldown && stringf(props.pulldown) === '[object Boolean]' && props.pulldown === true
})

// @lifecycles

onMounted(() => {
  _preInitial()
  _initial()
})

onActivated(() => {
  _recover()
})

onBeforeUnmount(() => {
  _dealloc()
})

// @methods

const _recover = () => {
  _ensureScroll()
  nextTick(() => setNeedsLayout())
}

const _initial = () => {
  // Promise.resolve().then(._preInit())
  nextTick(() => _preInit())
}

const _preInitial = () => {
  scroll = null
  // _initRefs()
}

const _preInit = async () => {
  _throttleActivityInspect = throttle(_activityInspect, 100)
  const indEl = document.querySelector('.rfa__ind')
  if (indEl) {
    indH = +(getComputedStyle(indEl).fontSize).replace(/px/gi, '')
  }
  if (ind.value && ind.value.isAnimating()) {
    ind.value.stopAnimating()
  }
  state.startDown = 0
  state.startUp = 0
  await _initScroll()
  // setTimeout(async () => {
  //   await _initScroll()
  // }, 20)
}

const _initRefs = () => {
  sw1.value = hash('rfa__0x', 4)
  sw2.value = hash('rfa__0x', 4)
  slot1.value = hash('rfas__0x', 4)
  slot2.value = hash('rfas__0x', 4)
}

const _activityInspect = (offsetY) => {
  if (offsetY === void 0 || offsetY < 0) {
    return
  }
  const elH = indH * 2.8
  if (offsetY === 0) {
    state.isPrePullingdown = false
  } else {
    state.isPrePullingdown = offsetY > elH
  }
  const threshold = +state.pulldownLoad?.threshold
  if (!threshold) {
    return
  }
  const delta = threshold + elH * 1.1
  // if (offsetY <= delta) {
    state.indPer = (offsetY - threshold * 0.6) / delta
  // }
}

const _ensureScroll = () => {
  // ensure scrollable
  let refVal
  // if (!sw1.value || !sw2.value || !slot1.value || !slot2.value) {
  //   return void 0
  // }
  if (props.direction === 'vertical') {
    if (slot1.value && sw1.value) {
      slot1.value.style.minHeight = `${rectf(sw1.value).height + 1}px`
    }
    refVal = sw1.value
  } else if (props.direction === 'horizontal') {
    if (slot2.value && sw2.value) {
      slot2.value.style.minWidth = `${rectf(sw2.value).width + 1}px`
    }
    refVal = slot2.value
  }
  return refVal
}

const _initScroll = () => {
  return new Promise((resolve, reject) => {
    let refVal = _ensureScroll()
    if (!refVal) {
      reject('cannot scroll in dom')
      return
    }
    if (props.pullup) {
      state.pullupLoad = _prePullup()
    }
    if (props.pulldown) {
      state.pulldownLoad = _prePulldown()
    }
    const scrollOpt = {
      nestedScroll: false,
      bounce: props.direction === 'vertical' ? { top: true, bottom: true } : { left: true, right: true },
      swipeBounceTime: 200,
      eventPassthrough: ['horizontal', 'vertical'].includes(props.eventPassthrough) ? props.eventPassthrough : ''
    }
    if (props.nestedScroll) {
      if (stringf(props.nestedScroll) === '[object Boolean]') {
        scrollOpt.nestedScroll = true
      } else if (stringf(props.nestedScroll) === '[object Object]') {
        scrollOpt.nestedScroll = stringf(props.nestedScroll.nested) === '[object Boolean]' ? props.nestedScroll.nested : false
        if (stringf(props.nestedScroll.bounce) === '[object Boolean]') {
          scrollOpt.bounce = props.direction === 'vertical' ? { top: props.nestedScroll.bounce, bottom: props.nestedScroll.bounce } : { left: props.nestedScroll.bounce, right: props.nestedScroll.bounce }
        }
      }
    }
    const options = {
      probeType: props.probeType, // 有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件
      click: props.click,
      stopPropagation: true,
      scrollbar: props.scrollbar,
      scrollY: props.direction === 'vertical', // 开启纵向滚动
      scrollX: props.direction === 'horizontal', // 开启横向滚动
      startY: props.startY, // 纵轴方向初始化位置
      startX: props.startX, // 横轴方向初始化位置
      ...scrollOpt,
      pullUpLoad: state.pullupLoad,
      pullDownRefresh: state.pulldownLoad
    }
    scroll = new BScroll(refVal, Object.assign(options, props.mouseWheel ? {
      mouseWheel: {
        speed: 2,
        invert: false,
        easeTime: 300
      }
    } : {}))
    scroll.on('scroll', pos => _scrollClosure(pos))
    
    if (props.observeBeforeScroll) {
      scroll.on('beforeScrollStart', _beforeScrollStartClosure)
    }
    _initScrollEnd()
    if (state.pullupLoad) {
      _initPullUpLoad()
    }
    if (state.pulldownLoad) {
      _initPullDown()
    }
    resolve(true)
  })
  
}

const _autoPullDown = async () => {
  if (!scroll || !state.pulldownLoad) {
    if (props.pulldown) {
      await _initScroll()
    } else {
      return
    }
  }
  nextTick(() => scroll.autoPullDownRefresh())
}

const autoRefresh = () => {
  setTimeout(() => {
    _autoPullDown()
  }, 20)
}

const setNeedsLayout = () => {
  if (scroll) {
    nextTick(() => scroll.refresh())
  }
}

const scrollTo = () => {
  scroll && scroll.scrollTo.apply(scroll, arguments)
}

const scrollToElement = () => {
  scroll && scroll.scrollToElement.apply(scroll, arguments)
}

const destroy = () => {
  scroll && scroll.destroy()
}

const _scrollClosure = (pos) => {
  if (props.observeScroll) {
    emit('scroll', pos)
  }
  if (props.pulldown && !state.isPullingdown) {
    _throttleActivityInspect(pos?.y)
  }
}

const _beforeScrollStartClosure = () => {
  emit('beforeScrollStart')
}

const _pullingUpClosure = () => {
  if (!state.hasMore) {
    return
  }
  state.startUp = new Date()
  state.isPullingup = true
  // setNeedsLayout()
  emit('pullingUp')
}

const _pullingDownClosure = () => {
  if (state.isPullingdown) {
    return
  }
  state.startDown = new Date()
  state.isPullingdown = true
  state.isPrePullingdown = false
  emit('pullingDown')
}

const _scrollEndClosure = () => {
  if (state.pullupLoad || state.pulldownLoad) {
    if (!state.isPullingup && !state.isPullingdown) return // reduce refresh when scroll without pullupload & pulldownload
    nextTick(() => {
      // !state.isPullingup && !state.isPullingdown && setNeedsLayout()
      setNeedsLayout()
    })
  }
  if (props.observeScrollEnd) {
    emit('scrollEnd')
  }
}

const _pullDownDance = (t) => {
  state.isPullingdownDone = t
  setTimeout(() => {
    state.isPullingdownDone = !t
  }, 600)
}

const _pullUpDance = (t) => {
  state.isPullingupDone = t
  setTimeout(() => {
    state.isPullingupDone = !t
  }, 800)
}

const _commitPullUp = (r) => {
  if (!state.pullupLoad || !state.isPullingup) {
    return
  }
  const t = new Date() - state.startUp < state.atLeast ? state.atLeast : 500
  setTimeout(() => {
    nextTick(() => scroll.finishPullUp())
    setNeedsLayout()
    state.isPullingup = false
    state.hasMore = r
    _pullUpDance(true)
  }, t)
}

const _commitPullDown = () => {
  if (!state.pulldownLoad) {
    return
  }
  if (state.isPullingdown) {
    const t = new Date() - state.startDown < state.atLeast ? state.atLeast : isJustPulldown ? 20 : 250
    setTimeout(() => {
      state.isPullingdown = false
      !isJustPulldown && _pullDownDance(true)
      nextTick(() => scroll.finishPullDown())
    }, t)
  }
  state.hasMore = true
  state.pullupLoad && setTimeout(() => scroll.openPullUp(state.pullupLoad), 20)
}

const endPullUp = (r) => {
  if (!scroll) {
    return
  }
  nextTick(() => _commitPullUp(r))
}

const endPullDown = () => {
  if (!scroll) {
    return
  }
  nextTick(() => _commitPullDown())
}

const _prePullup = () => {
  let tem = false
  const s = stringf(props.pullup)
  const ps = { normal: 'pull to load more', noMore: 'that is all', done: 'load succeed', loading: 'loading' }
  if (s === '[object Boolean]') {
    tem = {
      threshold: 10,
      text: ps,
      img: 'random'
    }
  } else if (s === '[object Object]') {
    tem = {
      threshold: +props.pullup?.threshold || 10,
      text: { normal: props.pullup?.text?.normal ?? ps.normal, noMore: props.pullup?.text?.noMore ?? ps.noMore, done: props.pullup?.text.done ?? ps.done, loading: props.pullup?.text?.loading ?? ps.loading },
      img: ['default', 'circular', 'spinner'].includes(props.pullup?.img) ? props.pullup?.img : 'random'
    }
  }
  return tem
}

const _prePulldown = () => {
  let tem = false
  const ps = { loading: 'refreshing', done: 'refresh succeed', normal: 'pull to refresh', holding: 'release to refresh' }
  const s = stringf(props.pulldown)
  if (s === '[object Boolean]') {
    tem = {
      threshold: 50,
      text: ps,
      img: 'random'
    }
  } else if (s === '[object Object]') {
    tem = {
      threshold: +props.pulldown?.threshold || 50,
      text: { loading: props.pulldown?.text?.loading ?? ps.loading, done: props.pulldown?.text?.done ?? ps.done, normal: props.pulldown?.text?.normal ?? ps.normal, holding: props.pulldown?.text?.holding ?? ps.holding },
      img: ['default', 'circular', 'spinner'].includes(props.pulldown?.img) ? props.pulldown?.img : 'random'
    }
  }
  return tem
}

const _initPullUpLoad = () => {
  scroll.on('pullingUp', _pullingUpClosure)
}

const _initPullDown = () => {
  scroll.on('pullingDown', _pullingDownClosure)
}

const _initScrollEnd = () => {
  scroll.on('scrollEnd', pos => _scrollEndClosure(pos))
}

const _dealloc = async () => {
  if (!scroll) {
    return Promise.resolve()
  }
  await new Promise(resolve => {
    setTimeout(() => {
      scroll.off('scroll', _scrollClosure)
      props.observeBeforeScroll && scroll.off('beforeScrollStart', _beforeScrollStartClosure)
      scroll.off('scrollEnd', _scrollEndClosure)
      state.pullupLoad && scroll.off('pullingUp', _pullingUpClosure)
      state.pulldownLoad && scroll.off('pullingDown', _pullingDownClosure)
      scroll.destroy()
      resolve()
    }, 600)
  })
}

defineExpose({
  autoRefresh,
  setNeedsLayout,
  endPullUp,
  endPullDown,
  // isPullingdown: state.isPullingdown,
  // isPullingdownDone: state.isPullingdownDone,
  // indPer: state.indPer,
  // isPullingup: state.isPullingup,
  // isPullingupDone: state.isPullingupDone,
  // hasMore: state.hasMore
})

</script>

<style lang="scss" scoped>
.rfa__pullup-wr {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .8em 0;
  transition: all .3s ease;
}
.rfa__pulldown-wr {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-100%) translateZ(0);
  transition: all .3s ease;
  text-align: center;
  color: #999;
  padding: .8em 0;
  .rfa__after-trigger {
    display: grid;
    justify-items: center;
  }
}
.rfa__main {
  transition: all .3s ease;
  // margin-top: -3.24em;
  margin-top: -4.1em;
}
.rfa__main-ing {
  margin-top: 0em;
}
.rfa__pulldown-wr-ing {
  transform: translateY(-50%) translateZ(0);
  padding: 0;
}
.rfa__before-trigger {
  min-height: 1.7em;
  line-height: 1.7em;
  span {
    color: #aaa;
    font-size: 1em;
  }
}
.rfa__ind {
  transition: all .3s ease;
  width: 0;
  height: 0;
}
.rfa__ind_mn {
  width: 2.5em;
  height: 2.5em;
}
</style>
