<template>
  <el-affix :offset="0">
    <div class="top-bar">
      <div class="modeBox">
        <el-dropdown trigger="click" >
      <span class="el-dropdown-link" style="display: flex;align-items: center">
        <el-icon size="18"><Connection /></el-icon>
        <div style="margin-left: 6px;font-size: 18px; font-weight: bold">{{ currentMode.label }} </div>
      </span>
          <template #dropdown>
            <el-dropdown-menu>
              <template
                  v-for="item in ModeList"
                  :key="item.value">
                <el-dropdown-item v-if="item.value!=currentMode.value" @click="changeMode(item)">{{ item.label }}
                  <el-tooltip
                      v-if="item.tooltip"
                      style="margin-left: 12px"
                      :content="item.tooltip"
                      placement="right-start"
                  >
                    <el-icon><QuestionFilled /></el-icon>
                  </el-tooltip></el-dropdown-item>

              </template>

            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div class="setupIcon">
        <el-dropdown trigger="click" >
      <span class="el-dropdown-link" style="display: flex;align-items: center">
        <el-icon size="16"><Setting /></el-icon>
        <div style="margin-left: 6px">设置</div>
      </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toCanvas">
                <el-icon size="16"><Download /></el-icon>
                导出为图片
              </el-dropdown-item>
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

              <el-dropdown-item @click="clearAll">
                <el-icon size="16" color="#F56C6C"><DeleteFilled /></el-icon>
                清空全部
              </el-dropdown-item>

              <el-dropdown-item @click="coffeeOpen">
                <el-icon size="16" color="#409EFF"><CoffeeCup /></el-icon>
                请作者喝杯咖啡
              </el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>



    </div>
  </el-affix>

  <div class="fluteList-box" id="fluteListBox">
    <Flute v-for="(item,index) in fluteList"
           :currentMode="currentMode.value"
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
    <div class="btn-list" data-html2canvas-ignore="true">
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
    <Coffee  ref="coffeeRef"></Coffee>
  </div>

</template>

<script  lang="ts">
import {ElMessage, ElMessageBox} from 'element-plus'
import {defineComponent, onMounted,onBeforeUnmount, ref} from "vue";
import Flute from "../components/Flute/Flute.vue";
import {getCache, setCache} from "./cache.ts";
import Coffee from "../components/Coffee.vue";
import html2canvas from 'html2canvas'
import {ModeList} from "./constant.ts";
export default defineComponent({
 name: "index",
  components: {
    Flute,
    Coffee
  },
  setup(context) {
   onMounted(()=>{
     window.addEventListener('keydown',handleKeyDown);
   })
    onBeforeUnmount(()=>{
          window.removeEventListener('keydown',handleKeyDown);
        }
    )
    const toCanvas =async () => {
       let fileName = await new Promise((resolve, reject) => {
        ElMessageBox.prompt('请输入保存的名称', '导出', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',

        })
            .then(({value}) => {
              resolve(value)
            })
            .catch(() => {
              resolve('')
            })

      })

      if(!fileName){
        return
      }

      const canvasDom = document.getElementById("fluteListBox")

      html2canvas(canvasDom, {scale: 1.3, windowWidth: 1920}).then((canvas) => {
        let canvasImg = canvas.toDataURL('image/png')
        let link = document.createElement('a')
        link.href = canvasImg
        link.setAttribute('download', fileName+'.png')
        link.click()
        link.remove()
      }).catch(() => {

      })

    }
    const coffeeRef = ref()
    const coffeeOpen = () => {
      coffeeRef.value.open()
    }
    const handleKeyDown = (event) => {
      // if (event.code === 'Enter') {
      //   // 处理回车键按下事件
      //   add('scale')
      // }
      if (event.code === 'Space') {
        // 处理空格按下事件
        add('space')
      }
      if (event.key === "1") {
        add('scale',1)
      }
      if (event.key === "2") {
        add('scale',2)
      }
      if (event.key === "3") {
        add('scale',3)
      }
      if (event.key === "4") {
        add('scale',4)
      }
      if (event.key === "5") {
        add('scale',5)
      }
      if (event.key === "6") {
        add('scale',6)
      }
      if (event.key === "7") {
        add('scale',7)
      }

    }
   const fluteList =ref([])
    onMounted( async () => {
      await initConfig()
    })



    const initConfig = async () => {
     let mode = await getCache("currentMode")
      if( mode){
        currentMode.value=JSON.parse(mode)
      }else {
        currentMode.value= {label:'筒音1模式',value:0,tooltip:''}
      }
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
   const add =(type :string,value?:number)=>{
     let obj :any ={
       value:value,
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





    const isAutoSave=ref()
    const isAutoSaveChange = () => {
        if(isAutoSave.value){
          openAutoSave()
        }else {
          clearInterval(intervalId)
        }
        setCache("isAutoSave",isAutoSave.value)

    }

    const clearAll=async () => {
      let res = await ElMessageBox.confirm("确定要清空当前谱子吗", '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',

      })

      if (res === 'confirm') {
        fluteList.value = []
        setCache("index_musicName",JSON.stringify(fluteList.value))
        ElMessage.success({
          message: '清空成功',
          type: 'success'
        });
      }
      }
      const currentMode = ref({label: '筒音1模式', value: 0, tooltip: ''});
      const changeMode = async (mode) => {
        let str = `确定要切换为${mode.label}吗？`
        try {

          let res = await ElMessageBox.confirm(str, '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',

          })

          if (res === 'confirm') {
            currentMode.value = mode
            setCache("currentMode", JSON.stringify(mode))
            if (mode.value === 2) {
              fluteList.value = []
            }
          }

        } catch (e) {

        }


      };
      return {
        currentMode,
        changeMode,
        value,
        fluteList,
        isShowFlute,
        isShowNumber,
        isShowLetter,
        isAutoSave,
        ModeList,
        coffeeOpen,
        clearAll,
        coffeeRef,
        toCanvas,
        isAutoSaveChange,
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
  .modeBox{

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
