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