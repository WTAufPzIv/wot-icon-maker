<template>
    <div
        class="page-container"
    >
        <header-bar></header-bar>
        <div class="main-wrapper">
            <a-side></a-side>
            <!-- <slot name="body"> -->
                <div class="wrapper">
                    <slot></slot>
                </div>
            <!-- </slot> -->
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
.wrapper {
    height: calc(100vh - 80px);
}
.wrapper::-webkit-scrollbar {
    width: 0;
}
</style>
