<template>
  <!-- 功能按钮 -->
  <el-button icon="Refresh" circle @click="handleRefresh" />
  <el-button icon="FullScreen" circle @click="handleFullScreen" />
  <el-button icon="Setting" circle />
  <!-- 头像 -->
  <el-avatar class="avatar" :src="userStore.avatar" />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span>
      {{ userStore.username }}
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/layoutSetting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

// 刷新按钮
const handleRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

// 全屏按钮
const handleFullScreen = () => {
  // DOM对象的一个属性，全屏：true，否则：false
  const full = document.fullscreenElement
  // 切换全屏模式
  if (!full) {
    // 进入全屏
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}

// 退出登录
const handleLogout = async () => {
  //调用退出登录接口, 清空仓库中用户相关的数据
  await userStore.userLogout()
  // 跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped lang="scss">
.avatar {
  margin: 0 10px;
}
</style>
