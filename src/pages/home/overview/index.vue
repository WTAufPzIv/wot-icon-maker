<template>
  <div class="overview-wrapper">
    <p class="current-path">当前目录：{{ gameState.current || '未选择（请进入设置选择游戏目录）' }}</p>
    <div class="tab">
      <div
        :class="['tab-item', selectedTab === 'data' ? 'active' : '']"
        @click="selectedTab = 'data'"
      >客户端数据</div>
      <div
        :class="['tab-item', selectedTab === 'icon' ? 'active' : '']"
        @click="selectedTab = 'icon'"
      >图标预览</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StoreModule } from '@core/const/store';
import { toRef } from 'vue';
import { useStore } from 'vuex';

const Store = useStore();
const gameState = Store.state[StoreModule.GAME]
const selectedTab = toRef('data')
</script>

<style scoped>
.overview-wrapper {
  width: 100%;
  min-width: 1300px;
  /* background-color: red; */
  padding: 60px;
}
.current-path {
  color: #ffffff99;
}
.tab {
  width: 500px;
  display: flex;
  flex-direction: row;
  color: #7b7b6e;
  font-size: 14px;
  position: relative;
  text-align: center;
  z-index: 2;
  margin-top: 40px;
  .tab-item {
    color: #ffffff90;
    background: #ffffff10;
    align-items: center;
    border-right: 1px solid #504f47;
    cursor: pointer;
    justify-content: center;
    padding: 13px 1%;
    width: 250px;
  }
  .tab-item:hover {
    color: #f25322b9;
    background: #ffffff1d;
  }
  .active {
    color: #f25322b9;
    font-weight: bold;
    background: #ffffff1d;
  }
}
</style>