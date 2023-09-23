<template>
  <div class="tabbar">
    <!-- 顶部左侧 -->
    <div class="tabbar_left">
      <!-- 面包屑组件 -->
      <Breadcrumb />
    </div>
    <!-- 顶部右侧 -->
    <div class="tabbar_right">
      <!-- 功能按钮，头像 -->
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
}
</style>
