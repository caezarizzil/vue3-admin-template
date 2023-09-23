<template>
  <!-- 折叠展开图标 -->
  <el-icon class="flod_icon" @click="changeIcon">
    <component :is="layoutSettingStore.flod ? 'Expand' : 'Fold'" />
  </el-icon>
  <!-- 面包屑组件 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 需要动态展示路由的图标与名字 -->
    <template v-for="item in $route.matched" :key="item.path">
      <el-breadcrumb-item :to="item.path" v-if="item.meta.title">
        <!-- 图标 -->
        <el-icon class="breadcrumb_icon">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 名字 -->
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/layoutSetting'
import { useRoute } from 'vue-router'

const $route = useRoute()

const layoutSettingStore = useLayoutSettingStore()

const changeIcon = () => {
  // 侧边菜单是否折叠
  layoutSettingStore.flod = !layoutSettingStore.flod
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped lang="scss">
.flod_icon {
  margin-right: 10px;
}
.breadcrumb_icon {
  top: 2px;
}
</style>
