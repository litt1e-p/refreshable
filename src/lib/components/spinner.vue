<template>
  <div class="mf-loading__sp" style="">   
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" style="display:block;background-repeat-y:initial;background-repeat-x:initial;background:transparent;margin: auto;shape-rendering: auto;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g transform="rotate(0 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.8045977011494252s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(24 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.7471264367816091s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(48 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.689655172413793s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(72 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.6321839080459769s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(96 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.5747126436781609s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(120 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.5172413793103448s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(144 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.4597701149425287s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(168 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.4022988505747126s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(192 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.3448275862068965s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(216 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.28735632183908044s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(240 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.22988505747126434s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(264 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.17241379310344826s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(288 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.11494252873563217s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(312 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="-0.057471264367816084s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(336 50 50)">
        <rect x="48" y="27.5" rx="2" ry="2.86" width="4" height="13" :fill="tintColor">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.8620689655172413s" begin="0s" repeatCount="indefinite"></animate>
        </rect>
      </g>
    </svg>
  </div>
</template>

<script>

export default {
  name: 'spinner',
  props: {
    tintColor: {
      type: String,
      default: () => '#aaaaaa'
    }
  }
}

</script>

<style lang="scss" scoped>
.mf-loading__sp {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.3em;
  height: 2.3em;
}
</style>
