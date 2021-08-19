<template>
     <div>
       <el-select v-model="value" placeholder="请选择">
         <el-option
             v-for="item in Drum1Options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
         </el-option>
       </el-select>
     </div>
     <div class="flute">
       <div class="top"></div>
       <div class="hole"></div>
       <div class="hole"></div>
       <div class="hole"></div>
       <div class="hole"></div>
       <div class="hole"></div>
       <div class="hole"></div>
     </div>
</template>

<script  lang="ts">

import {defineComponent, ref} from "vue";
export default defineComponent({
 name: "Flute",
  setup() {
    const holeList = ref([])
    //D调 D  E  F  G  A  B  C
    //   do re mi fa so la si
    const Drum1Options=[
      {
        label:"1 (D do) ",
        value:1
      },
      {
        label:"2 (E re) ",
        value:2
      },
      {
        label:"3 (F mi)",
        value:3
      },
      {
        label:"4 (G fa)",
        value:4
      },
      {
        label:"5 (A so)",
        value:5
      },
      {
        label:"6 (B la)",
        value:6
      },{
        label:"7 (C si)",
        value:7
      },
      {
        label:"1 (D do)高音",
        value:18
      },
      {
        label:"2 (E re)高音",
        value:9
      },
      {
        label:"3 (F mi)高音",
        value:10
      },
      {
        label:"4 (G fa)高音",
        value:11
      },
      {
        label:"5 (A so)高音",
        value:12
      },
      {
        label:"6 (B la)高音",
        value:13
      },{
        label:"7(C si)高音",
        value:14
      },


    ]
    return{
      Drum1Options,
    }
  }
})




</script>

<style rel="stylesheet/scss" lang="scss" >
   .flute{
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
     .top{
       width: 15px;
       height: 20px;
     }
     .hole{
       width: 20px;
       height: 20px;
       border-radius: 20px;
       background: white;
     }
   }
</style>
