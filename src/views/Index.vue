<template>
  <div class="top-bar">
<!--    <div style="width: 100%">-->
<!--      <el-slider v-model="value"  @change="sliderChange" />-->
<!--    </div>-->
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
            <el-dropdown-item>
              <div>
                <el-switch v-model="isAutoSave" @change="isAutoSaveChange" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
                <span class="setupTit">自动保存</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              请作者喝杯咖啡
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
import {getCache, setCache} from "./cache.ts";
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
    onMounted( async () => {
      await initConfig()
    })



    const initConfig = async () => {
      let index_musicNameStr = await getCache("index_musicName")
       isAutoSave.value = await getCache("isAutoSave")
      if( isAutoSave.value ){
        openAutoSave()
      }

      console.log(index_musicNameStr)
      if (index_musicNameStr) {
        fluteList.value = JSON.parse(index_musicNameStr)
      } else {
        fluteList.value = [
          {
            value: 1,
            vocalPart: 1
          },
          {
            value: 1,
            vocalPart: 1
          },
          {
            value: 1,
            vocalPart: 1
          },]
      }
    }

    let intervalId
    const openAutoSave = ()=> {
      intervalId =  setInterval(()=>{
          save()
        },30000)
    }
   const add =(type :string)=>{
     let obj :any ={
       value:7,
       vocalPart:1
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
       value:1,
       vocalPart:1
     }
      if(type=="space"){
        obj.space=true
        index++
      }
      fluteList.value.splice(index,0,obj)
      fluteList.value=[...fluteList.value]

    }
    const scaleChange=(index,scale,vocalPart)=>{
      fluteList.value[index].value = scale
      fluteList.value[index].vocalPart = vocalPart
      fluteList.value=[...fluteList.value]
    }

    const save =()=>{
      let musicName ="index_musicName"

      setCache(musicName,JSON.stringify(fluteList.value))

      ElMessage.success({
        message: '保存成功',
        type: 'success'
      });

    }
    const isShowFlute=ref(true)
    const isShowNumber=ref(true)
    const isShowLetter=ref(true)

    const value = ref(0)

// 在渲染进程的脚本中



    const sliderChange = (val)=>{
      // 发送消息到主进程
    window.electronAPI.setSlider(val)

    }

    const isAutoSave=ref()
    const isAutoSaveChange = () => {
        if(isAutoSave.value){
          openAutoSave()
        }else {
          clearInterval(intervalId)
        }
        setCache("isAutoSave",isAutoSave.value)

    }



    return{
      value,
      fluteList,
      isShowFlute,
      isShowNumber,
      isShowLetter,
      isAutoSave ,
      isAutoSaveChange,
      add,
      sliderChange,
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
