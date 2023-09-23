<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/layoutSetting'
import { nextTick, ref, watch } from 'vue'

const layoutSettingStore = useLayoutSettingStore()

// 控制当前组件的创建与销毁
const flag = ref(true)

// 监听layoutSettingStore中的refresh数据变化，说点击了刷新按钮
watch(
  () => layoutSettingStore.refresh,
  () => {
    flag.value = false
    // dom更新完毕之后再加载
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
