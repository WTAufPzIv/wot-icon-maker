<template>
  <div class="wrapper">
    <router-link to="/">
      <div :class="['nav', route.name === 'icon.overview' ? 'active': '']">
        <HomeOutlined />
        <p>总览</p>
      </div>
    </router-link>
    <div class="nav" @click="handleOpenEditor">
      <FormOutlined />
      <p>编辑器</p>
    </div>
    <router-link to="/setup">
      <div :class="['nav', route.name === 'icon.setup' ? 'active': '']">
        <SettingOutlined />
        <p>设置</p>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { FormOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router'

const route = useRoute();

function handleOpenEditor() {
  (window as any).electron.ipcRenderer.send('window-control', 'open-editor');
}
</script>

<style scoped>
.wrapper {
  width: 150px;
  background-color: rgb(27,27,27);
  height: calc(100vh - 80px);
  .active {
    background-color: rgba(255,255,255,0.1);
  }
  .nav {
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      display: block;
      font-size: 40px;
      color: aliceblue;
    }
    p {
      color: aliceblue;
      font-size: 18px;
      margin-top: 12px;
    }
  }
  .nav:hover {
    background-color: rgba(255,255,255,0.1);;
  }
}
</style>