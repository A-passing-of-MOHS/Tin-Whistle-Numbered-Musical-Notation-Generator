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
        <el-button  @click="add('space')" style="margin-bottom: 10px;">添加留白</el-button>
      </el-row>
      <el-row>
        <el-button  @click="save"  style="width: 98px;">保  存</el-button>
      </el-row>
    </div>
  </div>

</template>

<script  lang="ts">
import { ElMessage } from 'element-plus'
import {defineComponent, onMounted, ref} from "vue";
import Flute from "../components/Flute/Flute.vue";
export default defineComponent({
 name: "index",
  components: {
    Flute
  },
  setup(context) {

   const fluteList =ref([])
    onMounted(()=>{
     let index_musicNameStr = localStorage.getItem("index_musicName")
      console.log(index_musicNameStr)
      if(index_musicNameStr){
        fluteList.value=JSON.parse(index_musicNameStr)
      }else {
        fluteList.value= [
          {
            value: 1
          },
          {

            value: 1
          },
          {
            value: 1
          }]
      }
    })
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

    const save =()=>{
      let musicName ="index_musicName"
      localStorage.setItem(musicName,JSON.stringify(fluteList.value))
      ElMessage.success({
        message: '保存成功',
        type: 'success'
      });

    }

    return{
      fluteList,
      add,
      deleteItem,
      addItem,
      scaleChange,
      save

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
