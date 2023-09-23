<template>
  <svg :aria-hidden="hidden" :style="{ width: width, height: height }">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  // xlink:href属性值的前缀
  prefix: {
    type: String,
    default: 'icon',
  },
  // svg矢量图的名字
  name: {
    type: String,
    require: true,
  },
  // svg图标的颜色
  color: {
    type: String,
    default: '',
  },
  // svg宽度
  width: {
    type: String,
    default: '16px',
  },
  // svg高度
  height: {
    type: String,
    default: '16px',
  },
  // 图标是否是隐藏的
  hidden: {
    type: Boolean,
    default: true,
  },
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
