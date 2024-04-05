<template>
    <div
        class="page-container"
    >
        <header-bar></header-bar>
        <div class="main-wrapper">
            <a-side></a-side>
            <div class="main-container">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderBar from './HeaderBar/index.vue';
import ASide from './Aside/index.vue';
</script>

<style lang="less" scoped>

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
</style>
