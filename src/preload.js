const { contextBridge, ipcRenderer } = require('electron');
// import {  contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld('electron', {ipcRenderer:{
    send: (channel, ...args) => ipcRenderer.send(channel,  ...args),
    receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    once: (channel, listener) => ipcRenderer.once(channel, (event, ...args) => listener(...args)),
  }});