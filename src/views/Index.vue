<template>
  <div class="top-bar">

    <div class="setupIcon">
      <el-dropdown trigger="click" >
      <span class="el-dropdown-link">
        设置<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
               <div>
                 <el-switch v-model="isShowFlute" active-color="#13ce66" inactive-color="#ff4949">
                 </el-switch>
                <span class="setupTit">隐藏笛子</span>
               </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div>
                <el-switch v-model="isShowNumber" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
                <span class="setupTit">显示数字</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div>
                <el-switch v-model="isShowLetter" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
                <span class="setupTit">显示字母</span>
              </div>
            </el-dropdown-item>


          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>



  </div>
  <div class="fluteList-box">
    <Flute v-for="(item,index) in fluteList"
           :isShow="!item.space"
           :index="index"
           :key="index"
           :flag="item.flag"
           :value="item"
           :isShowFlute="isShowFlute"
           :isShowNumber="isShowNumber"
           :isShowLetter="isShowLetter"
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
import {defineComponent, onMounted,onBeforeUnmount, ref} from "vue";
import Flute from "../components/Flute/Flute.vue";
export default defineComponent({
 name: "index",
  components: {
    Flute
  },
  setup(context) {
   onMounted(()=>{
     window.addEventListener('keydown',handleKeyDown);
   })
    onBeforeUnmount(()=>{
          window.removeEventListener('keydown',handleKeyDown);
        }
    )
    
    const handleKeyDown = (event) => {

      if (event.code === 'Enter') {
        // 处理回车键按下事件
        add('scale')
      }
      if (event.code === 'Space') {
        // 处理空格按下事件
        add('space')
      }
    }
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
     let obj :any ={
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
    }

    const save =()=>{
      let musicName ="index_musicName"
      localStorage.setItem(musicName,JSON.stringify(fluteList.value))
      ElMessage.success({
        message: '保存成功',
        type: 'success'
      });

    }
    const isShowFlute=ref(true)
    const isShowNumber=ref(true)
    const isShowLetter=ref(true)
   
    return{
      fluteList,
      isShowFlute,
      isShowNumber,
      isShowLetter,
      add,
      deleteItem,
      addItem,
      scaleChange,
      save

    }
  }
})




</script>

<style  lang="less" scoped >
.top-bar{
  height: 40px;
  width: 100%;
  display: flex;
  .setupIcon{
    margin-left: auto;

  }
}
.setupTit{
  margin-left: 5px;
}
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
