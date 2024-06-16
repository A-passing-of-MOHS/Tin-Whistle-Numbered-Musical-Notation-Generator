<script setup lang="ts">

import {onMounted,ref,defineEmits} from "vue";
import {addArchive, getAllArchive, setCache} from "./cache.ts";
import {ElMessage, ElMessageBox} from "element-plus";

const archiveDialog=ref(false)
const showArchiveList=async () => {
  allArchive.value = await getAllArchive()
  archiveDialog.value = true
}
const allArchive =ref([])


const addNew=async () => {
  let fileName = await new Promise((resolve, reject) => {
    ElMessageBox.prompt('请输入存档的名称', '新建存档', {
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

  if (!fileName) {
    fileName="未命名"
  }
  await addArchive(fileName)
  allArchive.value = await getAllArchive()
}

const changeArchive=(item)=>{
  Emit('save')
  setCache("currentArchive",item.key)
  Emit('changeArchive', JSON.parse(item.val)  )
  archiveDialog.value=false
  ElMessage.success({
    message: `切换为${item.key}`,
    type: 'success'
  });

}


const Emit = defineEmits(['changeArchive','save'])
</script>

<template>
  <div @click="showArchiveList"><el-icon size="16"><Document /></el-icon></div>
  <el-dialog v-model="archiveDialog" title="存档列表" width="60%">
    <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
      <el-button type="primary"  style="margin-left: 10px" class="item" @click="addNew">添加新存档</el-button>
      <el-button  class="item" v-for="item in allArchive" @click="changeArchive(item)" >{{JSON.parse(item.val).name}}</el-button>

    </div>
  </el-dialog>
</template>

<style scoped lang="less">
.item{
  width: 320px;
  height: 40px;
  margin-top: 12px;


}
</style>