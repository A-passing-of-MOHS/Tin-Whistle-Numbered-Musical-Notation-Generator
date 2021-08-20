<template>
  <div class="fluteList-box">
    <Flute v-for="(item,index) in fluteList"
           :isShow="!item.space"
           :index="index"
           :key="index"
           :flag="item.flag"
           :value="item"
           @deleteItem="deleteItem"
           @addItem="addItem"
           @change="scaleChange"
    />
    <div class="btn-list">
      <el-row>
        <el-button type="primary" style="margin-bottom: 10px;" @click="add('scale')">添加音阶</el-button>
      </el-row>
      <el-row>
        <el-button  @click="add('space')">添加留白</el-button>
      </el-row>
    </div>
  </div>

</template>

<script  lang="ts">

import {defineComponent,ref} from "vue";
import HelloWorld from "../components/HelloWorld.vue";
import Flute from "../components/Flute.vue";
export default defineComponent({
 name: "index",
  components: {
    HelloWorld,
    Flute
  },
  setup(context) {
   const fluteList =ref([
     {
       value: 1
     },
     {

       value: 1
     },
     {
       value: 1
     },])
   const add =(type :string)=>{
     let obj ={
       value:1
     }
     if(type=="scale"){

     }else {
       obj.space=true
     }
     fluteList.value.push(obj)
     fluteList.value=[...fluteList.value]
   }

   const deleteItem=(index)=>{
     fluteList.value.splice(index,1)
    }
    const addItem=(index,type)=>{
     let obj = {
       flag : "新增",
       value:1
     }
      if(type=="space"){
        obj.space=true
        index++
      }
      fluteList.value.splice(index,0,obj)
      fluteList.value=[...fluteList.value]

    }
    const scaleChange=(index,scale)=>{
      fluteList.value[index].value = scale
      fluteList.value=[...fluteList.value]
      console.log( fluteList.value)
    }

    return{
      fluteList,
      add,
      deleteItem,
      addItem,
      scaleChange,

    }
  }
})




</script>

<style rel="stylesheet/scss" lang="scss" >
.fluteList-box{
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  overflow:hidden;
  .btn-list{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
