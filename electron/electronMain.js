/**
 * electron 的主进程
 */
// 导入模块
const  { app, BrowserWindow ,ipcMain  } = require( 'electron')
const {runCmd} = require( "./utils");
const path = require('path')


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
