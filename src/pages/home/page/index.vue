<template>
    <div
        class="page-container"
    >
        <header-bar></header-bar>
        <div class="main-wrapper" id="main-wrapper">
            <a-side></a-side>
            <div class="main-container">
                <slot></slot>
            </div>
        </div>
        <div class="loading" v-show="gameState.gameLoading">
            <div class="loading-icon">
                <div class="loading1"></div>
                <div class="loading2"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderBar from './HeaderBar/index.vue';
import ASide from './Aside/index.vue';
import { useStore } from 'vuex';
import { StoreModule } from '@core/const/store';

const Store = useStore();
const gameState = Store.state[StoreModule.GAME]
</script>

<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.page-container {
    width: 100%;
    position: relative;
    flex-direction: column;
}
.main-wrapper{
    display: flex;
    flex-direction: row;
}
.main-container {
    flex-grow: 1;
    height: calc(100vh - 80px);
    background-color: rgb(41,41,41);
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.wrapper::-webkit-scrollbar {
    width: 0;
}
.loading {
    position: absolute;
    left: 0;
    top: 80px;
    background-color: rgba(0,0,0,0.8);
    width: 100vw;
    height: calc(100vh - 80px);
    z-index: 10;
    .loading-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: 9px 0 0;
        transform: translate(-50%, -50%);
        width: 114px;
        height: 114px;
        text-align: center;
        .loading1 {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: url('@src/assets/loading1.png') center no-repeat;
            animation: rotate 3s linear infinite;
        }
        .loading2 {
            position: absolute;
            top: 6px;
            right: 0;
            bottom: 0;
            left: 0;
            background: url("@src/assets/loading2.png") center no-repeat;
        }
    }
}
</style>
