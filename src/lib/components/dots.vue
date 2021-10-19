<template>
  <div class="mf-loading__sp" style="">   
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" style="display:block;background-repeat-y:initial;background-repeat-x:initial;background:transparent;margin: auto;" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
      <circle :fill="tintColor" stroke="none" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"/>
      </circle>
      <circle :fill="tintColor" stroke="none" cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"/>
      </circle>
      <circle :fill="tintColor" stroke="none" cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"/>
      </circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'dots'
}
</script>

<script setup>

defineProps({
  tintColor: {
    type: String,
    required: false,
    default: '#aaaaaa'
  }
})

</script>

<style lang="scss" scoped>
.mf-loading__sp {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.3em;
  height: 2.3em;
  margin-left: 0.5em;
}
</style>
