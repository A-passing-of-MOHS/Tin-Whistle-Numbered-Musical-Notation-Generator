export  const setCache = (key,value) => {
    if( window.electronAPI){
        window.electronAPI.setCache(key,value)
    }else {
        localStorage.setItem(key,value)
    }
}



export const getCache = (key) => {
    if( window.electronAPI){
        return window.electronAPI.getCache(key)
    }else {
        return localStorage.getItem(key)
    }
}


export const getAllCache =async () => {
    if( window.electronAPI){
       let allCache = await window.electronAPI.getAllCache()
        let arr = new Array() // 定义数据集
        for (let key in allCache){
            arr.push({ 'key': key, 'val': allCache[key] })
        }
        return arr
    }else {
        return getAllStorage()
    }
}


/**存档结构
 * Archive_1:{name:xxx,}
 */
export const getAllArchive= async () => {
    let allCache = await getAllCache()
    let archiveList = allCache.filter(item => item.key.startsWith('Archive_'))
    return archiveList
}

export const addArchive=async (name:string) => {
    let allCache = await getAllCache()
    let archiveList = allCache.filter(item => item.key.startsWith('Archive_'))
    let key ="Archive_"+ archiveList.length
    setCache(key,JSON.stringify({name:name,data:[]}))
}




// 获取全部 getAllStorage
export const getAllStorage = () => {
    let len =localStorage.length // 获取长度
    let arr = new Array() // 定义数据集
    for (let i = 0; i < len; i++) {
        // 获取key 索引从0开始
        let getKey = localStorage.key(i)
        // 获取key对应的值
        let getVal = localStorage.getItem(getKey)
        // 放进数组
        arr[i] = { 'key': getKey, 'val': getVal, }
    }
    return arr
}
