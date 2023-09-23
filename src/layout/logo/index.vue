<template>
  <div class="logo" v-if="settings.showLogo">
    <img :src="settings.logo" alt="logo" />
    <p v-show="!layoutSettingStore.flod">{{ settings.title }}</p>
  </div>
</template>

<script setup lang="ts">
import settings from '@/settings'
import useLayoutSettingStore from '@/store/modules/layoutSetting';
const layoutSettingStore = useLayoutSettingStore()
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 30px;
    height: 30px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 20px;
  }
}
</style>
