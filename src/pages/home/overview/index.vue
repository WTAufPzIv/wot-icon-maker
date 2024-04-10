<template>
  <div class="overview-wrapper">
    <p class="current-path">当前目录：{{ gameState.current || '未选择（请进入设置选择游戏目录）' }}
      <div @click="handleClick">
          <a class="add-button">
            <span>
              导出
            </span>
          </a>
        </div>
    </p>
    <template v-if="gameState.current">
      <div class="tab">
        <!-- <div
          :class="['tab-item', selectedTab === 'data' ? 'active' : '']"
          @click="selectedTab = 'data'"
        >客户端数据</div> -->
        <div
          :class="['tab-item', selectedTab === 'all' ? 'active' : '']"
          @click="selectedTab = 'all'"
        >全部</div>
        <div
          :class="['tab-item', selectedTab === key ? 'active' : '']"
          @click="selectedTab = key"
          v-for="[key, value] in tabs"
        >{{ value }}</div>
      </div>
      <div class="tank-wrapper">
        <div class="margin-box" v-for="tank in renderData" ref="itemRefs">
          <jx-normal
            :tank="tank"
            @click="handleOpen(tank)"
          ></jx-normal>
        </div>
      </div>
    </template>
  </div>
  <a-drawer
    v-model:open="open"
    :root-style="{ color: '#fff' }"
    class="custom-drawe-class"
    title="车辆数据"
    placement="bottom"
    height="900"
  >
    <div class="drawer-main">
      <div class="left">
        <p class="title">{{ curentTank.transName || '无对应翻译' }}</p>
        <p class="simple trans" @click="handleCopy(curentTank.tranksCode)">翻译字段（点击复制）： {{ curentTank.tranksCode }}</p>
        <p class="simple">视野： {{ curentTank.visibility }}</p>
        <p class="simple">穿深（弹种1）： {{ curentTank.shell1 }}</p>
        <p class="simple">穿深（弹种2）： {{ curentTank.shell2 }}</p>
        <p class="simple">坦克类型： {{ curentTank.class }}</p>
        <p class="simple">坦克标签： {{ curentTank.category }}</p>
      </div>
      <div class="right">
        <vue-json-pretty
          style="padding: 20px; border: 1px solid #d9d9d9"
          :data="tankExtInfo"
          :deep="1"
          v-if="open"
          :editable="true"
        ></vue-json-pretty>
      </div>
    </div>
  </a-drawer>
  <a-drawer
    v-model:open="openPreview"
    :root-style="{ color: '#fff' }"
    class="custom-drawe-class"
    title="导出预览"
    placement="bottom"
    height="900"
  >
    <div @click="handleClickCon">
      <a class="add-button">
        <span>
          确认导出
        </span>
      </a>
    </div>
    <div class="tank-wrapper tank-wrapper-scale">
      <div ref="itemRef" class="target">
        <jx-normal
            :tank="tank"
            v-for="tank in renderData"
            @click="handleOpen(tank)"
          ></jx-normal>
      </div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { StoreModule } from '@core/const/store';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { CountryName } from '@core/const/game';
import { message } from 'ant-design-vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import JxNormal from './jx-normal.vue';
import html2canvas from 'html2canvas';

const tabs = Object.entries(CountryName)
const Store = useStore();
const gameState = Store.state[StoreModule.GAME]
const selectedTab = ref(tabs[0][0])
const open = ref(false);
const openPreview = ref(false);
const curentTank: any = ref({})
const itemRef: any = ref(null);
const tankExtInfo = ref({});

function handleOpen(tank: any) {
  if (selectedTab.value === 'all') return;
  curentTank.value = tank;
  open.value = true;
  tankExtInfo.value = (window as any).countries[gameState.current][selectedTab.value][tank.tankId]
}

function handleCopy(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    message.success('复制成功');
  })
}

function sortObjects(arr: any) {
  return arr.sort((a: any, b: any) => {
      if (a.level !== b.level) {
          return a.level - b.level;
      } else {
          return a.class.charCodeAt(0) - b.class.charCodeAt(0);
      }
  });
}

function handleClick() {
  openPreview.value = true;
  // 遍历每个 div，导出为图片
  // (itemRefs.value).forEach((itemRef: any, index: number) => {
  //   html2canvas(itemRef).then(canvas => {
  //     // 将 Canvas 转换为 base64 格式的图片数据
  //     const imageData = canvas.toDataURL('image/png');
  //     // 创建一个 a 标签，并设置图片数据和下载属性
  //     const link = document.createElement('a');
  //     link.href = imageData;
  //     link.download = `image_${index}.png`; // 设置文件名
  //     // 将 a 标签添加到页面，并触发点击事件来下载图片
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link); // 下载完成后移除 a 标签
  //   });
  // });
}
function handleClickCon() {
    html2canvas(itemRef.value).then(canvas => {
      // 将 Canvas 转换为 base64 格式的图片数据
      const imageData = canvas.toDataURL('image/png');
      // 创建一个 a 标签，并设置图片数据和下载属性
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `image_${123}.png`; // 设置文件名
      // 将 a 标签添加到页面，并触发点击事件来下载图片
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // 下载完成后移除 a 标签
    });
}

const renderData = computed(() => {
  if (selectedTab.value === 'all') {
    let arr: any = []
    tabs.forEach((item: any) => {
      // console.log(item)
      // console.log(Object.values(gameState.tankRenderDatas[item[0]]))
      arr = [
        ...arr,
        ...Object.values(gameState.tankRenderDatas[item[0]])
      ]
    })
    return sortObjects(arr);
  }
  return sortObjects(Object.values(gameState.tankRenderDatas[selectedTab.value]))
});
</script>

<style scoped lang="less">
.overview-wrapper {
  width: 100%;
  min-width: 1300px;
  /* background-color: red; */
  padding: 30px;
}
.tank-wrapper {
  min-width: 1300px;
  padding: 20px 0;
  height: calc(100vh - 185px);
  /* height: 100%; */
  /* background-color: red; */
  overflow: scroll;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  .margin-box {
    margin-bottom: 20px;
    margin-right: 20px;
  }
}
.target {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
}
.tank-wrapper-scale {
  zoom: 0.5;
}
.tank-wrapper::-webkit-scrollbar {
  width: 0;
}
.current-path {
  color: #ffffff99;
  display: flex;
  align-items: center;
}
.tab {
  width: 1100px;
  display: flex;
  flex-direction: row;
  color: #7b7b6e;
  font-size: 14px;
  position: relative;
  text-align: center;
  z-index: 2;
  margin-top: 20px;
  .tab-item {
    color: #ffffff90;
    background: #ffffff10;
    align-items: center;
    border-right: 1px solid #504f47;
    cursor: pointer;
    justify-content: center;
    padding: 10px 0;
    width: 100px;
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
.drawer-main {
  width: 100%;
  // height: 200px;
  // background: red;
  display: flex;
  flex-direction: row;
  .left {
    width: 30%;
    padding-left: 20px;
    // background: red;
    p {
      margin: 0;
      padding: 0;
    }
    .title {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    .simple {
      font-size: 18px;
      margin-top: 20px;
    }
    .trans {
      cursor: pointer;
    }
  }
  .right {
    width: 70%;
    // background: yellow;
  }
  .right::-webkit-scrollbar {
    width: 0;
  }
}
.drawer-main::-webkit-scrollbar {
  width: 0;
}
.add-button {
  padding: 0 22px;
  box-shadow: 0 2px 0 #661000, inset 0 0 8px rgba(255,210,0,.1), inset 0 1px 0 #fab81b, inset 0 -1px 0 #ef4511;
  background: linear-gradient(to bottom,#fab81b 0%,#ef4511 100%) no-repeat 0,linear-gradient(to bottom,#fab81b 0%,#ef4511 100%) no-repeat 100%,#f25322 linear-gradient(to bottom,#f60 0%,#a6230e 100%) no-repeat;
  background-size: 1px 100%,1px 100%,cover;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  vertical-align: middle;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: #f9f5e1;
  text-transform: uppercase;
  text-shadow: 0 -1px rgba(71,0,0,.3);
  text-decoration: none;
  border-radius: 1px;
  position: relative;
  box-sizing: border-box;
  height: 44px;
  white-space: nowrap;
  margin-left: 550px;
  cursor: pointer;
  transition: color .15s ease-out;
  span {
    z-index: 2;
    font-size: 14px;
    margin: 0;
    padding: 0;
    color: #f9f5e1;
  }
}
</style>

<style lang="less">
.custom-drawe-class {
  background:  #1b1b1b !important;
  z-index: 99999;
  color: #fff;
  .ant-drawer-close {
    color: #fff;
  }
  .ant-drawer-title {
    color: #fff;
  }
  .ant-drawer-body::-webkit-scrollbar {
    width: 0;
  }
}
</style>