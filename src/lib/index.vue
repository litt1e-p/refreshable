<template>
  <div class="rfa__">
    <div :ref="sw1" class="rfa__wr" v-if="direction === 'vertical'" style="position: absolute;left: 0;top: 0;right: 0;bottom: 0;overflow: hidden;">
      <div class="rfa__scroll-content">
        <slot name="pulldown" v-bind:state="{ isPullingdown, isPullingdownDone, indPer }">
          <div class="rfa__pulldown-wr" :class="{'rfa__pulldown-wr-ing': isPullingdown}" v-if="pulldown">
            <div class="rfa__before-trigger" v-if="!isPullingdown">
              <span>{{pulldownText}}</span>
            </div>
            <div class="rfa__after-trigger">
              <loading v-show="!isJustPulldown && isPullingdown" :text="pulldownText" :type="pulldown.img" v-model="isPullingdown"></loading>
              <ActivityIndicator v-show="isJustPulldown" class="rfa__ind rfa__ind_mn" ref="ind" v-model="indPer" :animate="isPullingdown"/>
            </div>
          </div>
        </slot>
        <div :ref="slot1" :class="{'rfa__main-ing': isPullingdown, 'rfa__main': pulldown}">
          <slot></slot>
        </div>
        <slot name="pullup" v-bind:state="{ isPullingup, isPullingupDone, hasMore }">
          <div class="rfa__pullup-wr" v-if="pullup">
            <div class="rfa__before-trigger" v-if="!isPullingup">
              <span>{{pullupText}}</span>
            </div>
            <div class="rfa__after-trigger" v-show="isPullingup && hasMore">
              <loading :text="pullupText" :type="pullup.img" v-model="isPullingup"></loading>
            </div>
          </div>
        </slot>
      </div>
    </div>
    <div :ref="sw2" class="rfah__wr" v-else-if="direction === 'horizontal'">
      <div class="rfa__scroll-content">
        <div :ref="slot2" style="white-space: nowrap;overflow: hidden;">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>

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

const debounce = function(fn, delay) {
  let timer
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

const hash = function(px = '', n = 7) {
  return px + '-' + (Math.random() * 0xFFFFFF << n).toString(16)
}

export default {
  name: 'refreshable',
  props: {
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
      default: () => ''
    }
  },
  components: {
    Loading,
    ActivityIndicator
  },
  data () {
    return {
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
  },
  computed: {
    pullupText () {
      return !this.hasMore ? this.pullupLoad?.text?.noMore : this.isPullingup ? this.pullupLoad?.text?.loading : this.isPullingupDone ? this.pullupLoad?.text?.done : this.pullupLoad?.text?.normal
    },
    pulldownText () {
      return this.isJustPulldown ? void 0 : this.isPrePullingdown ? this.pulldownLoad?.text?.holding : this.isPullingdown ? this.pulldownLoad?.text?.loading : this.isPullingdownDone ? this.pulldownLoad?.text?.done : this.pulldownLoad?.text?.normal
    },
    isJustPulldown () {
      return this.pulldown && stringf(this.pulldown) === '[object Boolean]' && this.pulldown === true
    }
  },
  created () {
    this._preInitial()
  },
  mounted () {
    this._initial()
  },
  activated () {
    this._recover()
  },
  async beforeDestroy () {
    await this._dealloc()
  },
  methods: {
    _recover () {
      this._ensureScroll()
      this.$nextTick(() => this.setNeedsLayout())
    },
    _initial () {
      // Promise.resolve().then(this._preInit())
      this.$nextTick(() => this._preInit())
    },
    _preInitial () {
      this.scroll = null
      this._initRefs()
    },
    _preInit () {
      this._throttleActivityInspect = throttle(this._activityInspect, 100)
      const indEl = document.querySelector('.rfa__ind')
      if (indEl) {
        this.indH = +(getComputedStyle(indEl).fontSize).replace(/px/gi, '')
      }
      if (this.$refs.ind && this.$refs.ind.isAnimating()) {
        this.$refs.ind.stopAnimating()
      }
      this.startDown = 0
      this.startUp = 0
      // this._initScroll()
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    _initRefs () {
      this.sw1 = hash('rfa__0x', 4)
      this.sw2 = hash('rfa__0x', 4)
      this.slot1 = hash('rfas__0x', 4)
      this.slot2 = hash('rfas__0x', 4)
    },
    _activityInspect(offsetY) {
      if (offsetY === void 0 || offsetY < 0) {
        return
      }
      const elH = this.indH * 2.8
      if (offsetY === 0) {
        this.isPrePullingdown = false
      } else {
        this.isPrePullingdown = offsetY > elH
      }
      const threshold = +this.pulldownLoad?.threshold
      if (!threshold) {
        return
      }
      const delta = threshold + elH * 1.1
      // if (offsetY <= delta) {
        this.indPer = (offsetY - threshold * 0.6) / delta
      // }
    },
    _ensureScroll () {
      // ensure scrollable
      let ref
      if (!this.sw1 || !this.sw2 || !this.slot1 || !this.slot2) {
        return void 0
      }
      if (this.direction === 'vertical') {
        if (this.$refs[this.slot1] && this.$refs[this.sw1]) {
          this.$refs[this.slot1].style.minHeight = `${rectf(this.$refs[this.sw1]).height + 1}px`
        }
        ref = this.$refs[this.sw1]
      } else if (this.direction === 'horizontal') {
        if (this.$refs[this.slot2] && this.$refs[this.sw2]) {
          this.$refs[this.slot2].style.minWidth = `${rectf(this.$refs[this.sw2]).width + 1}px`
        }
        ref = this.$refs[this.slot2]
      }
      return ref
    },
    _initScroll () {
      let ref = this._ensureScroll()
      if (!ref) {
        return
      }
      if (this.pullup) {
        this.pullupLoad = this._prePullup()
      }
      if (this.pulldown) {
        this.pulldownLoad = this._prePulldown()
      }
      const scrollOpt = {
        nestedScroll: false,
        bounce: this.direction === 'vertical' ? { top: true, bottom: true } : { left: true, right: true },
        swipeBounceTime: 200,
        eventPassthrough: ['horizontal', 'vertical'].includes(this.eventPassthrough) ? this.eventPassthrough : ''
      }
      if (this.nestedScroll) {
        if (stringf(this.nestedScroll) === '[object Boolean]') {
          scrollOpt.nestedScroll = true
        } else if (stringf(this.nestedScroll) === '[object Object]') {
          scrollOpt.nestedScroll = stringf(this.nestedScroll.nested) === '[object Boolean]' ? this.nestedScroll.nested : false
          if (stringf(this.nestedScroll.bounce) === '[object Boolean]') {
            scrollOpt.bounce = this.direction === 'vertical' ? { top: this.nestedScroll.bounce, bottom: this.nestedScroll.bounce } : { left: this.nestedScroll.bounce, right: this.nestedScroll.bounce }
          }
        }
      }
      const options = {
        probeType: this.probeType, // 有时候我们需要知道滚动的位置。当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件
        click: this.click,
        stopPropagation: true,
        scrollbar: this.scrollbar,
        scrollY: this.direction === 'vertical', // 开启纵向滚动
        scrollX: this.direction === 'horizontal', // 开启横向滚动
        startY: this.startY, // 纵轴方向初始化位置
        startX: this.startX, // 横轴方向初始化位置
        ...scrollOpt,
        pullUpLoad: this.pullupLoad,
        pullDownRefresh: this.pulldownLoad
      }
      this.scroll = new BScroll(ref, Object.assign(options, this.mouseWheel ? {
        mouseWheel: {
          speed: 2,
          invert: false,
          easeTime: 300
        }
      } : {}))
      this.scroll.on('scroll', pos => this._scrollClosure(pos))
      
      if (this.observeBeforeScroll) {
        this.scroll.on('beforeScrollStart', this._beforeScrollStartClosure)
      }
      this._initScrollEnd()
      if (this.pullupLoad) {
        this._initPullUpLoad()
      }
      if (this.pulldownLoad) {
        this._initPullDown()
      }
    },
    _autoPullDown () {
      if (!this.scroll || !this.pulldownLoad) {
        return
      }
      this.$nextTick(() => this.scroll.autoPullDownRefresh())
    },
    autoRefresh () {
      setTimeout(() => {
        this._autoPullDown()
      }, 20)
    },
    setNeedsLayout () {
      if (this.scroll) {
        this.$nextTick(() => this.scroll.refresh())
      }
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    destroy () {
      this.scroll.destroy()
    },
    _scrollClosure (pos) {
      if (this.observeScroll) {
        this.$emit('scroll', pos)
      }
      if (this.pulldown && !this.isPullingdown) {
        this._throttleActivityInspect(pos?.y)
      }
    },
    _beforeScrollStartClosure () {
      this.$emit('beforeScrollStart')
    },
    _pullingUpClosure () {
      if (!this.hasMore) {
        return
      }
      this.startUp = new Date()
      this.isPullingup = true
      // this.setNeedsLayout()
      this.$emit('pullingUp')
    },
    _pullingDownClosure () {
      if (this.isPullingdown) {
        return
      }
      this.startDown = new Date()
      this.isPullingdown = true
      this.isPrePullingdown = false
      this.$emit('pullingDown')
    },
    _scrollEndClosure () {
      if (this.pullupLoad || this.pulldownLoad) {
        if (!this.isPullingup && !this.isPullingdown) return // reduce refresh when scroll without pullupload & pulldownload
        this.$nextTick(() => {
          // !this.isPullingup && !this.isPullingdown && this.setNeedsLayout()
          this.setNeedsLayout()
        })
      }
      if (this.observeScrollEnd) {
        this.$emit('scrollEnd')
      }
    },
    _pullDownDance (t) {
      this.isPullingdownDone = t
      setTimeout(() => {
        this.isPullingdownDone = !t
      }, 600)
    },
    _pullUpDance (t) {
      this.isPullingupDone = t
      setTimeout(() => {
        this.isPullingupDone = !t
      }, 800)
    },
    _commitPullUp (r) {
      if (!this.pullupLoad || !this.isPullingup) {
        return
      }
      const t = new Date() - this.startUp < this.atLeast ? this.atLeast : 500
      setTimeout(() => {
        this.$nextTick(() => this.scroll.finishPullUp())
        this.setNeedsLayout()
        this.isPullingup = false
        this.hasMore = r
        this._pullUpDance(true)
      }, t)
    },
    _commitPullDown () {
      if (!this.pulldownLoad) {
        return
      }
      if (this.isPullingdown) {
        const t = new Date() - this.startDown < this.atLeast ? this.atLeast : this.isJustPulldown ? 20 : 250
        setTimeout(() => {
          this.isPullingdown = false
          !this.isJustPulldown && this._pullDownDance(true)
          this.$nextTick(() => this.scroll.finishPullDown())
        }, t)
      }
      this.hasMore = true
      this.pullupLoad && setTimeout(() => this.scroll.openPullUp(this.pullupLoad), 20)
    },
    endPullUp (r) {
      if (!this.scroll) {
        return
      }
      this.$nextTick(() => this._commitPullUp(r))
    },
    endPullDown () {
      if (!this.scroll) {
        return
      }
      this.$nextTick(() => this._commitPullDown())
    },
    _prePullup () {
      let tem = false
      const s = stringf(this.pullup)
      const ps = { normal: 'pull to load more', noMore: 'that is all', done: 'load succeed', loading: 'loading' }
      if (s === '[object Boolean]') {
        tem = {
          threshold: 10,
          text: ps,
          img: 'random'
        }
      } else if (s === '[object Object]') {
        tem = {
          threshold: +this.pullup?.threshold || 10,
          text: { normal: this.pullup?.text?.normal ?? ps.normal, noMore: this.pullup?.text?.noMore ?? ps.noMore, done: this.pullup?.text.done ?? ps.done, loading: this.pullup?.text?.loading ?? ps.loading },
          img: ['default', 'circular', 'spinner'].includes(this.pullup?.img) ? this.pullup?.img : 'random'
        }
      }
      return tem
    },
    _prePulldown () {
      let tem = false
      const ps = { loading: 'refreshing', done: 'refresh succeed', normal: 'pull to refresh', holding: 'release to refresh' }
      const s = stringf(this.pulldown)
      if (s === '[object Boolean]') {
        tem = {
          threshold: 50,
          text: ps,
          img: 'random'
        }
      } else if (s === '[object Object]') {
        tem = {
          threshold: +this.pulldown?.threshold || 50,
          text: { loading: this.pulldown?.text?.loading ?? ps.loading, done: this.pulldown?.text?.done ?? ps.done, normal: this.pulldown?.text?.normal ?? ps.normal, holding: this.pulldown?.text?.holding ?? ps.holding },
          img: ['default', 'circular', 'spinner'].includes(this.pulldown?.img) ? this.pulldown?.img : 'random'
        }
      }
      return tem
    },
    _initPullUpLoad () {
      this.scroll.on('pullingUp', this._pullingUpClosure)
    },
    _initPullDown () {
      this.scroll.on('pullingDown', this._pullingDownClosure)
    },
    _initScrollEnd () {
      this.scroll.on('scrollEnd', pos => this._scrollEndClosure(pos))
    },
    async _dealloc () {
      if (!this.scroll) {
        return Promise.resolve()
      }
      await new Promise(resolve => {
        setTimeout(() => {
          this.scroll.off('scroll', this._scrollClosure)
          this.observeBeforeScroll && this.scroll.off('beforeScrollStart', this._beforeScrollStartClosure)
          this.scroll.off('scrollEnd', this._scrollEndClosure)
          this.pullupLoad && this.scroll.off('pullingUp', this._pullingUpClosure)
          this.pulldownLoad && this.scroll.off('pullingDown', this._pullingDownClosure)
          this.scroll.destroy()
          resolve()
        }, 600)
      })
    }
  }
}

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
