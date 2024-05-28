const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    setSlider: (val) => ipcRenderer.send('set-slider', val),
    openUrl: (url) => ipcRenderer.send('open-url', url),
    setCache: (key,val) => ipcRenderer.send('set-cache', key,val),
    getCache: (key) => ipcRenderer.invoke('get-cache', key),
})