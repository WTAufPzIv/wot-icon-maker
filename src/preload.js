const { contextBridge, ipcRenderer } = require('electron');
// import {  contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld('electron', {ipcRenderer:{
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
  }});
// window.ipcRenderer = ipcRenderer
console.log(window.electron)