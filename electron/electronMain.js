/**
 * electron 的主进程
 */
// 导入模块
import  { app, BrowserWindow  }  from 'electron'

// 创建主窗口
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    // 加载当前vue 的地址
   // win.loadURL('http://localhost:5173')
    // 加载当前vue 的地址
    // win.loadURL('http://localhost:5173')

    // 加载打包之后的页面内容
    //******主要就是这里，加载的文件内容改变了******
    // 因为 vue 打包之后的内容，我们输出到了 electron/pages 目录下
    win.loadFile(path.resolve(__dirname,'pages/index.html'))


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
