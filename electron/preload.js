const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    setSlider: (val) => ipcRenderer.send('set-slider', val)
})