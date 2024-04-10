<template>
    <div
        :tank="props.tank"
        :class="['tank-item', cssMap[tank.class]]"
        :style="{
            color: (tank.category === CategoryEnum.Normal || tank.category === CategoryEnum.Collector )? 'rgb(235,236,238)' : 'rgb(229,191,29)'
        }"
    >
    <div class="left">{{ tank.level }}</div>
    <div class="right"
        :style="{
            fontSize: `${calculateFontSize(tank.transName, 100)}px`,
        }"
    >
        {{ tank.transName }}
    </div>
    </div>
</template>
  
<script setup lang="ts">
import { CategoryEnum, ClassEnum } from '@core/const/game';
import { defineProps } from 'vue';
const props = defineProps<{
    tank: any;
}>();

const cssMap: any = {
    [ClassEnum.lightTank]: 'lt',
    [ClassEnum.mediumTank]: 'mt',
    [ClassEnum.heavyTank]: 'ht',
    [ClassEnum['AT-SPG']]: 'td',
    [ClassEnum.SPG]: 'spg',
}

function calculateFontSize(str: string, maxLength: number) {
  const div = document.createElement('div');
  div.style.visibility = 'hidden';
  div.style.fontSize = '20px';
  div.style.position = 'absolute';
  div.style.top = '-9999px';
  div.innerHTML = str;
  document.body.appendChild(div);
  
  let fontSize = 20;
  let width = div.offsetWidth;
  
  if (width <= maxLength) {
    document.body.removeChild(div);
    return 20;
  }
  
  while (width > maxLength && fontSize > 0) {
    fontSize--;
    div.style.fontSize = `${fontSize}px`;
    width = div.offsetWidth;
  }
  
  document.body.removeChild(div);
  return fontSize;
}
</script>

<style scoped lang="less">
.tank-item {
    position: relative;
    overflow: hidden;
    width: 160px;
    height: 52px;
    // margin-bottom: 20px;
    // margin-right: 20px;
    font-size: 12px;
    cursor: pointer;
    border: 2px solid #000;
    border-radius: 10px;;
    text-shadow: 4px 4px 4px #222;
    .left {
        position: absolute;
        overflow: hidden;
        width: 40px;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        left: 4px;
        top: 4px;
        font-size: 20px;
    }
    .right {
        position: absolute;
        width: 100px;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        left: 48px;
        top: 4px;
        white-space: nowrap;
        // background-color: red;
    }
}
.tank-item::after {
    position: absolute;
    content: '';
    width: 2px;
    height: 40px;
    top: 4px;
    left: 42px;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 3px 0 4px 1px rgba(0, 0, 0, 0.3);
}
.tank-item::before {
    position: absolute;
    content: '';
    width: 150px;
    height: 0px;
    top: 22px;
    left: 2px;
    background: #000;
    box-shadow: 0px 0 15px 5px rgba(0, 0, 0, 0.8);
}
.ht {
    box-shadow: 0 0 0 2px rgb(219,219,219) inset;
    background-color: rgb(99,99,99);
}
.td {
    box-shadow: 0 0 0 2px rgb(168,192,233) inset;
    background-color: rgb(45,95,186);
}
.mt {
    box-shadow: 0 0 0 2px rgb(231,216,152) inset;
    background-color: rgb(183,156,49);
}
.lt {
    box-shadow: 0 0 0 2px rgb(160,233,162) inset;
    background-color: rgb(35,158,43);
}
.spg {
    box-shadow: 0 0 0 2px rgb(224,135,135) inset;
    background-color: rgb(178,42,42);
}
</style>