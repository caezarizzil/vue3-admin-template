<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <!-- logo -->
      <Logo />
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          router
          background-color="#001529"
          text-color="white"
          unique-opened
          :default-active="$route.path"
          :collapse="layoutSettingStore.flod"
        >
          <!-- 自定义菜单组件 -->
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{flod:layoutSettingStore.flod}">
      <!-- 顶部tabbar组件 -->
      <Tabbar />
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main" :class="{flod:layoutSettingStore.flod}">
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
// Logo组件
import Logo from './logo/index.vue'
// 菜单组件
import Menu from './menu/index.vue'
// 内容展示区组件
import Main from './main/index.vue'
// 顶部tabbar
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/layoutSetting'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()
const $route = useRoute()
</script>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: white;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100vw - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.flod {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: white;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.flod {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
