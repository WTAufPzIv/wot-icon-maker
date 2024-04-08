
<template>
  <div class="setup-wrapper">
    <p class="setup-title">
      游戏路径
      <span>(可添加多个游戏路径)</span>
      <div @click="handleClick">
        <a class="add-button">
          <span>
            添加游戏
          </span>
        </a>
      </div>
    </p>
    <table class="game-table-wrapper">
      <tbody>
        <tr>
          <th class="name-cl"><p>游戏服务器</p></th>
          <th class="version-cl"><p>版本号</p></th>
          <th class="path-cl"><p>安装路径</p></th>
          <th class="select-cl"><p>当前</p></th>
          <th class="btn-cl"><p>操作</p></th>
        </tr>
        <tr v-for="item in (Object.values(gameState.gameInstallations) as any)">
          <td>{{ item.gameName }}</td>
          <td>{{ item.gameVersion }}</td>
          <td>
            <span class="btn" @click="handleOpenFolder(item)">{{ item.path }}</span>
          </td>
          <td>
            <CheckOutlined v-if="item.path === gameState.current"/>
            <span
              v-else
              class="btn"
              @click="handleChangeCurrent(item)"
            >选择</span>
          </td>
          <td>
            <span
              class="btn"
              @click="handleRemove(item)"
            >移除</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { StoreModule } from '@core/const/store';
import { ipcMessageTool } from '@core/utils/game';
import { toRef } from 'vue';
import { useStore } from 'vuex';
import { CheckOutlined } from '@ant-design/icons-vue'

const Store = useStore();
const gameState = toRef(Store.state[StoreModule.GAME])

function handleClick() {
  Store.dispatch(`${StoreModule.GAME}/addGameInstallation`);
}

async function handleRemove(item: any) {
  const confirmRes = await confirm(`确认移除${item.gameName}?`);
  if (confirmRes) {
    Store.dispatch(`${StoreModule.GAME}/removeGameInstallation`, item.path);
  }
}

function handleOpenFolder(item: any) {
  ipcMessageTool('file', 'open-folder', { path: item.path });
}

async function handleChangeCurrent(item: any) {
  const confirmRes = await confirm(`确认切换当前游戏文件夹为【${item.gameName}】【 ${item.path}】？`);
  if (confirmRes) {
    Store.dispatch(`${StoreModule.GAME}/changeCurrent`, item.path);
  }
}
</script>


<style scoped>
.setup-wrapper {
  min-width: 1000px;
  /* background-color: red; */
  padding: 60px;
  .setup-title {
    font-size: 24px;
    color: #f25322;
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      font-size: 20px;
      color: #b8b8a2;
      margin-left: 20px;
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
    .add-button:after {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      content: "";
      box-shadow: inset 0 0 8px rgba(255,210,0,.1), inset 0 1px 0 #fab81b, inset 0 -1px 0 #ff7e00;
      background: linear-gradient(to bottom,#fab81b 0%,#ff7e00 100%) no-repeat 0,linear-gradient(to bottom,#fab81b 0%,#ff7e00 100%) no-repeat 100%,#ff7e00 linear-gradient(to bottom,#ff7e00 0%,#c2530a 100%) no-repeat;
      background-size: 1px 100%,1px 100%,cover;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.15s ease-out;
      will-change: opacity;
    }
    .add-button:hover {
      color: #f9f5e1;
      cursor: pointer;
    }
    .add-button:hover:after {
      opacity: 1;
    }
  }
  .game-table-wrapper {
    width: 1000px;
    margin-top: 50px;
    color: #b8b8a2;
    .name-cl {
      width: 120px;
    }
    .version-cl {
      width: 100px;
    }
    .btn-cl {
      width: 60px;
    }
    .select-cl {
      width: 50px;
    }
    th {
      width: 250px;
      background: #302f2d;
      border: 1px solid #43423c;
      padding: 15px 18px 15px 18px;
      p {
        margin: 0;
        padding: 0;
        font-size: 16px;
      }
    }
    td {
      padding: 15px 0;
      border: 1px solid #43423c;
      text-align: center;
      .btn {
        color: #f25322;
        cursor: pointer;
      }
    }
  }
}
</style>