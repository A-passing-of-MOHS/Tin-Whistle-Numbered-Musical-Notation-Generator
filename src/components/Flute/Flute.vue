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
            <div v-if="isShowNumber" style="height: 65px">
              <div v-if="selectScale.value>20" style="display: flex">
                <div class="highLabel"></div>
                <div class="highLabel"></div>
              </div>
              <div class="highLabel" v-if="selectScale.value>10&&selectScale.value<20"></div>
              <div class="highLabelHide" v-if="selectScale.value<=7"></div>
              <div class="scaleLabel">{{ selectScale.nlabel }}</div>
            </div>

            <div v-if="isShowLetter" style="height: 65px">
            <div v-if="selectScale.value>20" style="display: flex">
              <div class="highLabel"></div>
              <div class="highLabel"></div>
            </div>

            <div class="highLabel" v-if="selectScale.value>10&&selectScale.value<20"></div>
            <div class="highLabelHide" v-if="selectScale.value<=7"></div>
            <div class="scaleLabel">{{ selectScale.elabel }}</div>
            </div>
          </div>
          <div class="flute" v-if="isShowFlute">
            <div class="top"></div>
            <div class="holeList">
              <div class="line"></div>
              <div v-for="item in fluteData" class="hole" :style="{background:item==1?'black':''  }"></div>
            </div>
          </div>

        </div>


      </template>

    </el-popover>
    <div style="width: 100%;height: 100%" v-else @click="showMsg"></div>


    <div class="fluteLabel" v-if="selectScale.value>10&&selectScale.value<20&&isShowFlute">+</div>

    <div class="fluteLabel" v-if="selectScale.value>20&&isShowFlute">++</div>


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
    }
  },
  setup(props, context) {
    const scale = ref(null)
    const visible = ref(false)

    //D调 D  E  F  G  A  B  C
    //   do re mi fa so la si
    const Drum1Options = DrumOption.options1
    const fluteData = ref([
      0, 0, 0, 0, 0, 0
    ])
    const selectScale = ref({
      label: "1 (D do) ",
      nlabel: "1",
      elabel: "D",
      value: 1
    },)
    onMounted(() => {
      //scaleChange(selectScale.value)
      scaleChange(props.value)
    })
    watch(() => props.value, (newValue, oldValue) => {
      scaleChange(newValue)
    })
    const scaleChange = (e) => {
      let list = [0, 0, 0, 0, 0, 0]
      switch (e.value) {
        case 1:
          list = [1, 1, 1, 1, 1, 1]
          break
        case 2:
          list = [1, 1, 1, 1, 1, 0]
          break
        case 3:
          list = [1, 1, 1, 1, 0, 0]
          break
        case 4:
          list = [1, 1, 1, 0, 0, 0]
          break
        case 5:
          list = [1, 1, 0, 0, 0, 0]
          break
        case 6:
          list = [1, 0, 0, 0, 0, 0]
          break
        case 7:
          list = [0, 0, 0, 0, 0, 0]
          break
        case 11:
          list = [0, 1, 1, 1, 1, 1]
          break
        case 12:
          list = [1, 1, 1, 1, 1, 0]
          break
        case 13:
          list = [1, 1, 1, 1, 0, 0]
          break
        case 14:
          list = [1, 1, 1, 0, 0, 0]
          break
        case 15:
          list = [1, 1, 0, 0, 0, 0]
          break
        case 16:
          list = [1, 0, 0, 0, 0, 0]
          break
        case 17:
          list = [0, 0, 0, 0, 0, 0]
          break
        case 21:
          list = [0, 1, 1, 1, 1, 1]
          break
        default:
          list = []

      }
      fluteData.value = list
      Drum1Options.forEach(item => {
        if (item.value == e.value) {
          selectScale.value = item
        }
      })
      context.emit("change", props.index, e.value)
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
      scale,
      fluteData,
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

    .highLabel {
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
      height: 12px;

    }

    .scaleLabel {
      font-size: 32px;

    }
  }


}

.fluteLabel {
  font-size: 36px;
}

.flute {
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


</style>
