<template>
  <div class="flute-box">
    <!--    {{index}}-->
    <!--    {{ flag }}-->
    <el-popover
        v-if="isShow"
        placement="right"
        :width="210"
        trigger="click"
        v-model:visible="visible"
    >

      <el-select v-model="scale" placeholder="请选择" @change="scaleChange" style="margin-bottom:10px">
        <el-option
            v-for="item in Drum1Options"
            :key="item.value"
            :label="item.label"
            :value="item">
        </el-option>
      </el-select>
      <el-select v-model="vocalPart" placeholder="请选择" @change="VocalPartChange" style="margin-bottom:10px">
        <el-option
            v-for="item in VocalPartOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="addItem('scale',false)">右侧添加</el-button>
        </el-col>
        <el-col :span="12">

          <el-button @click="addItem('space',false)">添加留白</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="12">

        </el-col>
        <el-col :span="12">
          <el-button type="danger" @click="deleteItem">删除此条</el-button>
        </el-col>

      </el-row>
      <template #reference>
        <div>
          <div class="popoverBtn">
            <div v-if="isShowNumber" class="labelBox" >
              <div v-if="vocalPart==3" style="display: flex">
                <div class="highLabel"></div>
                <div class="highLabel"></div>
              </div>
              <div class="highLabel" v-if="vocalPart==2"></div>
              <div class="highLabelHide" v-if="vocalPart<2"></div>
              <div class="scaleLabel">{{ selectScale.nlabel }}</div>
              <div class="lowLabel"  v-if="vocalPart==0"></div>
              <div class="highLabelHide"  v-if="vocalPart!=0"></div>
            </div>

            <div v-if="isShowLetter"  class="labelBox" >
            <div v-if="vocalPart==3" style="display: flex">
              <div class="highLabel"></div>
              <div class="highLabel"></div>
            </div>

            <div class="highLabel" v-if="vocalPart==2"></div>
              <div class="highLabelHide" v-if="vocalPart<2"></div>
            <div class="scaleLabel">{{ selectScale.elabel }}</div>
              <div class="lowLabel" v-if="vocalPart==0" ></div>
              <div class="highLabelHide"  v-if="vocalPart!=0"></div>
            </div>
          </div>
          <div class="flute" v-if="isShowFlute">
            <div class="top"></div>
            <div class="holeList">
              <div class="line"></div>
              <div v-for="(item,index) in fluteData" @click.stop="changeFluteItemData(index)"
                   class="hole"
                   :class="item==2?'hole2':''"
                   :style="{background:item==1?'black':''  }"></div>
            </div>
          </div>

        </div>


      </template>

    </el-popover>
    <div style="width: 100%;height: 100%" v-else @click="showMsg"></div>

    <div class="fluteLabel" v-if="vocalPart==0">-</div>
    <div class="fluteLabel" v-if="vocalPart==2">+</div>

    <div class="fluteLabel" v-if="vocalPart==3">++</div>


  </div>

</template>

<script lang="ts">

import {defineComponent, ref, onMounted, watch} from "vue";
import {DrumOption} from "./DrumOption";
import {ElMessage, ElMessageBox} from "element-plus";

export default defineComponent({
  name: "Flute",
  props: {
    flag: {
      type: String,
      default() {
        return ''
      }
    },
    index: {
      type: Number,
      default() {
        return 0
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    isShowNumber: {
      type: Boolean,
      default() {
        return true
      }
    },
    isShowLetter: {
      type: Boolean,
      default() {
        return true
      }
    },
    isShowFlute:{
      type: Boolean,
      default() {
        return true
      }
    },
    isShow: {
      type: Boolean,
      default() {
        return true
      }
    },
    currentMode:{
      type: Number,
      default() {
        return 0
      }
    }
  },
  setup(props, context) {
    console.log(JSON.stringify(props.value),"props66")
    const scale = ref({value: 1})
    const vocalPart = ref(1)
    const visible = ref(false)

    //D调 D  E  F  G  A  B  C
    //   do re mi fa so la si
    const Drum1Options = DrumOption.options2
    const VocalPartOptions = DrumOption.vocalPart
    const fluteData = ref([
      0, 0, 0, 0, 0, 0
    ])
    const selectScale = ref({
      label: "1 (D do) ",
      nlabel: "1",
      elabel: "D",
      value: 0,
      vocalPart:1
    },)
    onMounted(() => {
      //scaleChange(selectScale.value)
      vocalPart.value=props.value.vocalPart
      modeChange()

      VocalPartChange(props.value.vocalPart)

    })
    watch(() => props.value, (newValue, oldValue) => {
      vocalPart.value=props.value.vocalPart
      scaleChange(newValue)
      VocalPartChange(props.value.vocalPart)
    })

    let FingeringList=[] //对应的指法
    function modeChange() {
      let mode = props.currentMode
      if (mode == 0){
        FingeringList = DrumOption.FingeringList_D
      }else if(mode == 1){
        FingeringList = DrumOption.FingeringList_G
      }else if(mode == 2){
        FingeringList = DrumOption.FingeringList_E
      } else {
        FingeringList=[]
      }

      scaleChange(props.value)

    }

    watch(() => props.currentMode, (newValue, oldValue) => {
      modeChange(newValue)
    })

    const changeFluteItemData = (index) => {
      //只有专业模式下可以点
      if (props.currentMode != 20) {
        return
      }
      let item = fluteData.value[index]
     switch (item){
       case  0:
          fluteData.value[index]=1
          break;
       case  1:
          fluteData.value[index]=2
          break;
       case  2:
         fluteData.value[index]=0
         break;
       default:
         fluteData.value[index]=0
         break;
     }

    }
    const getValueByFluteData = () => {
      //根据孔位匹配笛子的音标

      let list = fluteData.value
      console.log(list)
      let num =0
      list.forEach(i=>num+=i)
      console.log(num)
      let index = 0
      switch (num){
        case 0:
          index = 6
          break;
        case 1:
          index = 5
          break;
        case 2:
          index = 4
          break;
        case 3:
          index = 3
          break;
        case 4:index = 2
          break;
        case 5:
          if(list[0]==0){
            index = 1
            selectScale.value.vocalPart=2
            vocalPart.value=2
          }else {
            index = 1
          }
          break;
        case 6:
          index = 0
          break;
        default:
          selectScale.value.value = 1
          fluteData.value=[0, 1, 1, 1, 1, 1]
      }
      if( vocalPart.value==2&&selectScale.value.vocalPart==2){

      }else {
        selectScale.value=Drum1Options[index]
      }


    }
    const VocalPartChange = (e) => {

         selectScale.value.vocalPart=e

      if(e > 1){
        if(selectScale.value.value == 1){
          //D调1的高音指法不太一样
          if( props.currentMode==0){
            fluteData.value  = [0, 1, 1, 1, 1, 1]
          }
          //E调1的高音指法不太一样
          if( props.currentMode==2){
            fluteData.value  = [0, 1, 1, 1, 1, 0]
          }



        }
        if(selectScale.value.value == 2){
          fluteData.value  = [0, 1, 1, 1, 1, 1]
        }
        if(selectScale.value.value == 3){
          fluteData.value  = [1, 1, 0, 1, 1, 0]
        }

        if(selectScale.value.value == 4){
          //G调4的高音指法不太一样
          if( props.currentMode==1){
            fluteData.value  = [0, 1, 1, 1, 1, 0]
          }

        }


      }
      context.emit("change", props.index, selectScale.value.value,vocalPart.value)

    }



    const scaleChange = (e) => {
      if(props.currentMode==20){
        //专业模式下无联动
        Drum1Options.forEach(item => {
          if (item.value == e.value) {
            selectScale.value = item
          }
        })
        context.emit("change", props.index, e.value,vocalPart.value)
        return
      }

      let list = [0, 0, 0, 0, 0, 0]
      if(FingeringList.length>0){
        switch (e.value) {
          case 1:
            list = FingeringList[0]
            break
          case 2:
            list = FingeringList[1]
            break
          case 3:
            list = FingeringList[2]
            break
          case 4:
            list = FingeringList[3]
            break
          case 5:
            list = FingeringList[4]
            break
          case 6:
            list = FingeringList[5]
            break
          case 7:
            list = FingeringList[6]
            break
          default:
            list = []

        }
      }

      fluteData.value = list
      Drum1Options.forEach(item => {
        if (item.value == e.value) {
          selectScale.value = item
        }
      })
      context.emit("change", props.index, e.value,vocalPart.value)
    }

    const deleteItem = () => {
      context.emit("deleteItem", props.index)
      visible.value = false

    }
    const showMsg = () => {
      ElMessageBox.confirm('是否删除此项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteItem();}).catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消删除',
            });
          });

    }
    const addItem = (type: string, isLeft: boolean) => {
      let index = props.index
      if (type == "scale") {
        if (index != 0) {
          if (isLeft) {

          } else {
            index++
          }
        }


      }

      context.emit("addItem", index, type)
      visible.value = false

    }

    return {
      Drum1Options,
      VocalPartOptions,
      VocalPartChange,
      scale,
      vocalPart,
      fluteData,
      changeFluteItemData,
      selectScale,
      visible,
      scaleChange,
      addItem,
      deleteItem,
      showMsg
    }
  }
})


</script>

<style lang="less">
.flute-box {
  width: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
  .popoverBtn {

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .labelBox{
      height: 58px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    .highLabel {
      width: 12px;
      height: 12px !important;
      border-radius: 12px;
      background: #000000;

    }
    .lowLabel {
      width: 12px;
      height: 12px !important;
      border-radius: 12px;
      background: #000000;

    }

    .highhightLabel {
      font-size: 12px;
      line-height: 12px;
      margin-bottom: -5px;
    }

    .highLabelHide {
      //height: 12px;

    }

    .scaleLabel {
      color: #1a1a1a;
      font-size: 32px;
      line-height: 32px;
      margin-bottom: 2px;

    }
  }

  .fluteLabel {
    font-size: 36px;
  }

  .flute {
    margin-top: 12px;
    width: 28px;
    height: 280px;

    border-radius: 5px;
    background: #cddce5;
    box-shadow: inset -13px -13px 26px #aab7be,
    inset 13px 13px 26px #f0ffff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;

    .top {
      width: 15px;
      height: 20px;
    }

    .holeList {
      height: 260px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-around;

      .line {
        height: 2px;
        width: 100%;
        background: #f01440;
        position: relative;
        top: 130px
      }

      .hole {
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background: white;
        overflow: hidden;
        position: relative;
      }
      .hole2 {
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background: black;
        overflow: hidden;
        position: relative;
      }
      .hole2::before {
        content: "";
        width: 100%;
        height: 200%;
        background-color: white;
        position: absolute;
        bottom: -100%;


      }
    }

  }
}

.flute-box-small {
  width: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;

  .popoverBtn {

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .labelBox{
      height: 58px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    .highLabel {
      width: 12px;
      height: 12px !important;
      border-radius: 12px;
      background: #000000;

    }
    .lowLabel {
      width: 12px;
      height: 12px !important;
      border-radius: 12px;
      background: #000000;

    }

    .highhightLabel {
      font-size: 12px;
      line-height: 12px;
      margin-bottom: -5px;
    }

    .highLabelHide {
      //height: 12px;

    }

    .scaleLabel {
      font-size: 32px;
      line-height: 32px;
      margin-bottom: 2px;

    }
  }

  .fluteLabel {
    font-size: 36px;
  }

  .flute {
    margin-top: 12px;
    width: 28px;
    height: 280px;

    border-radius: 5px;
    background: #cddce5;
    box-shadow: inset -13px -13px 26px #aab7be,
    inset 13px 13px 26px #f0ffff;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;

    .top {
      width: 15px;
      height: 20px;
    }

    .holeList {
      height: 260px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-around;

      .line {
        height: 2px;
        width: 100%;
        background: #f01440;
        position: relative;
        top: 130px
      }

      .hole {
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background: white;
      }
    }

  }
}


</style>
