<script setup lang="ts">
import {ref} from "vue";
let url= 'https://space.bilibili.com/16585834/channel/series'
const openUrl = () => {
   let url = 'https://space.bilibili.com/16585834/channel/series'
   window.electronAPI.openUrl(url)
}
const isShow = ref(false)
const open =() =>{
  isShow.value = true
}
defineExpose({open})
</script>

<template>
  <el-dialog width="960" title="请作者喝杯咖啡" v-model="isShow">
    <div>
      <div>您的支持和认可是我最大的动力,<a style="cursor: pointer" @click="openUrl"> 点击去往b站主页</a></div>
      <div class="img-box">
        <img src="../assets/wx.png" />
        <img src="../assets/wx2.png" />
        <img src="../assets/zfb.jpg" />
      </div>
    </div>
  </el-dialog>
</template>

<style scoped lang="less">
.img-box{
  width:100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
 img{
   display: block;
   width: 270px;

 }
</style>