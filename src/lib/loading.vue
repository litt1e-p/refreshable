<template>
  <div class="mf-loading-container">
    <span :class="{ 'mr': props.type === 'default' }">{{props.text}}</span>
    <!-- <img :src="require(`./assets/img/${svg}.svg`)" alt=""> -->
    <component :is="svgView"></component>
  </div>
</template>

<script setup>

import { reactive, computed, watch, defineAsyncComponent } from 'vue'

const svgView = computed(() => defineAsyncComponent(() => import(`./components/${state.svg}.vue`)))

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: 'loading'
  },
  type: {
    type: String,
    default: 'random'
  }
})

const state = reactive({
  ops: ['circular', 'spinner', 'dots'],
  svg: 'dots'
})

const strategy = v => {
  let t = void 0
  if (state.ops.includes(v)) {
    t = v
  } else {
    t = random()
  }
  state.svg = t
  return t
}

const random = () => {
  return state.ops[Math.round(Math.random() * 2)]
}

const toggle = () => {
  if (state.ops.includes(state.type)) {
    return
  }
  state.svg = state.random()
}

watch(() => props.type, (v, o) => {
  strategy(v)
}, { immediate: true })

watch(() => props.value, v => {
  v && toggle(v)
}, { immediate: true })

</script>

<style lang="scss">
.mf-loading-container{
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 1em;
    color: #aaa;
  }
  img {
    width: 2em;
    height: auto;
  }
  .mr {
    margin-right: 0.4em;
  }
}
</style>
