/**
 * electron 的主进程
 */
// 导入模块
import   { app, BrowserWindow ,ipcMain,shell  } from 'electron'
import Store from 'electron-store'
const store = new Store();
// const {runCmd} = require( "./utils");
import path from 'path'
import {fileURLToPath} from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


// 是否是开发环境
const isDev = process.env.IS_DEV == "true" ? true : false;

// 创建主窗口
const createWindow = async () => {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    //缩放监听
    ipcMain.on('set-slider', (event, value) => {
        console.log(value,"缩放值")
        win.webContents.setZoomLevel(-value*0.1)
    })

    ipcMain.on('open-url', (event, value) => {
        console.log(value,"缩放值")
        shell.openExternal(value)
    })

    ipcMain.handle('all-cache', (event, key) => {
        console.log(store.store)
        return  store.store
    });

    ipcMain.on('set-cache', (event, key, value) => {
        store.set(key, value);
    });

    ipcMain.handle('get-cache',  (event, key) => {
       return store.get(key);

    });

    let level = 0;
    // 缩放
    win.webContents.on('zoom-changed',(e, zoomDirection)=>{
        if (zoomDirection === 'in') {
            level = level >= 3 ? level : level += 0.2
        } else {
            level = level <= -3 ? level : level -= 0.2
        }
        win.webContents.setZoomLevel(level)
    })

    //隐藏顶部菜单
   win.setMenu(null);
    // 加载当前vue 的地址
    console.log(isDev,"isDev")
    if(isDev){
        // 开发环境下启动 vue 服务

      // runCmd('vite')


        win.loadURL('http://localhost:5173')
        win.webContents.openDevTools()
    }else {
        // 加载打包之后的页面内容
        //******主要就是这里，加载的文件内容改变了******
        // 因为 vue 打包之后的内容，我们输出到了 electron/pages 目录下
        win.loadFile(path.resolve(__dirname,'pages/index.html'))

    }






}

// 应用准备就绪，加载窗口
app.whenReady().then(() => {

    createWindow()

    // mac 上默认保留一个窗口
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    console.log('--- app ready ---')
})

// 关闭所有窗口 ： 程序退出 ： windows & linux
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
