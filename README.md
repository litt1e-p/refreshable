# Refreshable

a pull to refresh component for vue

## Installation

```js
npm i refreshable
```

1. globally
```js
import Refreshable from 'refreshable'
import 'refreshable/dist/assets/refreshable.css'

Vue.use(Refreshable)
```

2. partially
```js
import { Refreshable } from 'refreshable'
import 'refreshable/dist/assets/refreshable.css'

<script>
components: {
  Refreshable
}
</script>

```

## Usage

1. turn on pulldown or pullup simply

```html
<refreshable ref="rf" :pulldown="true" :pullup="true" @pullingUp="doPullup" @pullingDown="doPulldown">
  // your html
</refreshable>
```

2. custom-built for your own
```html
 <refreshable ref="rf" :pulldown="{
            threshold: 50,
            text: {
              loading: 'loading for u',
              normal: 'pull to refresh',
              done: 'done'
            },
            img: 'random' // spinner/circular/dots/random(default)
          }" :pullup="{
            threshold: 10,
            text: { loading: 'loading', done: 'done', normal: 'pull up and load more', noMore: 'all loaded' },
            img: 'circular' // spinner/circular/dots/random(default)
          }" @pullingUp="doPullup" @pullingDown="doPulldown">
  // your html      
</refreshable>
```
3. closure funcs

- 3.1 endpoint

```js
this.$refs.refreshable.endPullDown() // for pull down event
this.$refs.refreshable.endPullUp(hasMore: Boolean) // for pull up event
```

- 3.2 layout recalculate

```js
this.$refs.refreshable.setNeedsLayout()
```

- 3.3 auto refresh
```js
this.$refs.refreshable.autoRefresh()
```

## Notice

> your `fixed` component or dom element will not effects when wrapped in `<refreshable>` cause of the dependency of the lib is base on `transform`. therefore, your should place all `fixed` elements out of the wrapper.