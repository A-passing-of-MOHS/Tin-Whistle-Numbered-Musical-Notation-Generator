<template>
  <div>
    <el-affix :offset="0" style="height: 40px">
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
        <div style="margin-left: 32px;display: flex;align-items: center">
          <archive @changeArchive="changeArchive" @save="save"></archive><el-input style="display: block; width: 200px;"  v-model="archiveName" @blur="save"></el-input>

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
      <div style="position: relative" v-for="(item,index) in fluteList">

        <div style="height: 14px;">
          <div  data-html2canvas-ignore="true" style="position:absolute;top: 0; height: 14px;cursor: pointer;width: 100%; background: #79bbff;border:1px solid #1a1a1a"  @click="changeLine(item)"></div>
          <div class="line" v-if="item.line==1" :class="getLineClass(item,index,1)" ></div>

          <div  v-if="item.line==2">
            <div class="line" :class="getLineClass(item,index,1)"></div>
            <div class="line2" :class="getLineClass(item,index,2)" ></div>

          </div>
        </div>
        <Flute
               v-if="!item.space"
               :currentMode="currentMode.value"
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
        <div v-else class="space" @click="deleteItem(index)" >
          <div></div>
        </div>
      </div>


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

  </div>

</template>

<script setup  lang="ts">
import {ElMessage, ElMessageBox} from 'element-plus'
import {defineComponent, onMounted,onBeforeUnmount, ref} from "vue";
import Flute from "../components/Flute/Flute.vue";
import {addArchive, getAllArchive, getAllCache, getCache, setCache} from "./cache.ts";
import Coffee from "../components/Coffee.vue";
import html2canvas from 'html2canvas'
import {ModeList} from "./constant.ts";
import Archive from "./Archive.vue";

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


    const archiveName=ref('')
    const initConfig = async () => {
      // console.log("getAllCache", getAllCache())
      let mode = await getCache("currentMode")
      if (mode) {
        currentMode.value = JSON.parse(mode)
      } else {
        currentMode.value = {label: '筒音1模式', value: 0, tooltip: ''}
      }

      //获取默认存档
      let currentArchive = await getCache("currentArchive")
      if (currentArchive) {
        let archiveData = JSON.parse(await getCache(currentArchive))
        fluteList.value = archiveData.data
        archiveName.value = archiveData.name
      } else {
        let fileName = "未命名"
        await addArchive(fileName)
        setCache("currentArchive", "Archive_0")
        fluteList.value = []
        archiveName.value = "未命名"


      }


      isAutoSave.value = await getCache("isAutoSave")
      if (isAutoSave.value) {
        openAutoSave()
      }

    }



    let intervalId
    const openAutoSave = ()=> {
      intervalId =  setInterval(()=>{
          save()
        },30000)
    }
   const add =(type :string,value = 1)=>{
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
    let currentArchiveKey = getCache("currentArchive")

      let Archive ={
        name:archiveName.value,
        data:fluteList.value}

      setCache(currentArchiveKey,JSON.stringify(Archive))

      ElMessage.success({
        grouping: true,
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


    const getLineClass = (item,index,line=1)=> {
     if(line==1){
       if(item.line===1){
         if(fluteList.value[index+1].line>=fluteList.value[index].line){
           return "line-long"
         }

       } else if(item.line===2){
         if(fluteList.value[index+1].line>=1){
           return "line-long"
         }

       }
     }else {
       if(fluteList.value[index+1].line==2){
         return "line2-long"
       }
     }



    }


    const changeLine = (item) => {
        let line = item.line
        if(!line){
          item.line = 1
        }else if(line==1){
          item.line = 2
        }else {
          item.line = 0
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

const changeArchive = (archive) => {
   archiveName.value= archive.name
  fluteList.value = archive.data
}



</script>

<style  lang="less" scoped >
.line{
  position: absolute;
  top:122px;
  margin-left: 20px;
  width: 40px;
  height: 2px;
  background: #666;
  margin-bottom: 10px;
}
.line-long{
  position: absolute;
  top:122px;
  width: 80px;
  height: 2px;
  background: #666;
  margin-bottom: 10px;
}
.line2{
  position: absolute;
  top:130px;
  margin-left: 20px;
  width: 40px;
  height: 2px;
  background: #666;
  margin-bottom: 10px;
}
.line2-long{
  position: absolute;
  top:130px;
  margin-left: 20px;
  width: 80px;
  height: 2px;
  background: #666;
  margin-bottom: 10px;
}




.space{
  display: flex;
 justify-content: center;
  width: 80px;
  height: 100%;
  div{
    width: 2px;
    height: 68px;
    background: #666;
    margin-top: 20px;
  }
}
.top-bar{
  margin-left: -2rem;
  padding:0 2rem ;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 2px 2px 21px #ccc;
  height: 40px;
  width: 100vw;
  display: flex;
  align-items: center;
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
  margin-top: 40px;
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
