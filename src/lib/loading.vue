<template>
  <div class="mf-loading-container">
    <span :class="{ 'mr': type === 'default' }">{{text}}</span>
    <!-- <img :src="require(`./assets/img/${svg}.svg`)" alt=""> -->
    <component :is="svg"></component>
  </div>
</template>

<script>

import circular from './components/circular'
import spinner from './components/spinner'
import dots from './components/dots'

export default {
  name: 'loading',
  components: {
    circular,
    spinner,
    dots
  },
  props: {
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
      default: 'random' // circular spinner dots
    }
  },
  data () {
    return {
      ops: ['circular', 'spinner', 'dots'],
      svg: 'dots'
    }
  },
  methods: {
    strategy (v) {
      if (this.ops.includes(v)) {
        this.svg = v
      } else {
        this.svg = this.random()
      }
    },
    random () {
      return this.ops[Math.round(Math.random() * 2)]
    },
    toggle () {
      if (this.ops.includes(this.type)) {
        return
      }
      this.svg = this.random()
    }
  },
  watch: {
    type: {
      handler (v) {
        this.strategy(v)
      },
      immediate: true
    },
    value: {
      handler (v) {
        v && this.toggle()
      },
      immediate: true
    }
  }
}
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
