<template>
  <div class="main">
    <el-form>
      <el-form-item>
        <el-input v-model.trim="inputValue" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-button type="primary" @click="handleClick">Search</el-button>
    </el-form>
    <Table :list='courseList' :editClick='editClick' :deleteHandle='deleteHandle' />
    <Pagination :currentChange="currentChange"></Pagination>
  </div>
  <EditPop :popShow="popShow" v-if='popShow' :message='courseItemState.message' :confirmClick='confirmClick' />
</template>
<script setup>
import Table from './Table.vue'
import EditPop from './EditPop.vue'
import Pagination from './Pagination.vue'
import { reactive, ref, computed } from 'vue'
/**
 * 初始化的數據
 */
const data = reactive({
  list: [
    {
      category: "front",
      courseImg: "https://file.xdclass.net/video/2022/77-QD/cover.jpeg",
      del: 0,
      id: 1,
      point: 9.8,
      price: "99",
      title: "22年新版【前端高级工程师】面试专题第一季"
    },
    {
      category: "front",
      courseImg: "https://file.xdclass.net/video/2022/75-Vue3/cover1.jpeg",
      del: 0,
      id: 2,
      point: 9.5,
      price: "99",
      title: "22年新版-零基础玩转vue3+开发仿美团外卖项目vue视频"
    },
    {
      category: "front",
      courseImg: "https://file.xdclass.net/video/2022/76-webpack5/cover.jpeg",
      del: 0,
      id: 3,
      point: 9.3,
      price: "59",
      title: "新版webpack5丨带你玩转时下最流行的构建工具"
    },
    {
      category: "front",
      courseImg: "https://file.xdclass.net/video/2021/74-git/WechatIMG3026.jpeg",
      del: 0,
      id: 4,
      point: 9.2,
      price: "39",
      title: "22年新版-玩转Git零基础到进阶实战 git视频急速入门"
    },
    {
      category: "front",
      courseImg: "https://file.xdclass.net/video/2021/73-ES6/cover.jpeg",
      del: 0,
      id: 5,
      point: 9.4,
      price: "49",
      title: "22年新版-玩转ECMAScript6零基础到进阶实战es6视频"
    },
  ],
  page: 1,//默認展示第一頁
  total: 15, //課程總數
})
/**
 * 分頁的邏輯
 */
const currentChange = (val) => {
  if (val === 'pre') {
    if (data.page > 1) {
      data.page--
    } else {
      ElMessage({
        message: '已經是第一頁了！！！',
        type: 'warning',
        showClose: true
      })
    }
  }
  if (val === 'next') {
    if (data.page < Math.ceil(data.total / 5)) {
      data.page++
    } else {
      ElMessage({
        message: '已經是後一頁了！！！',
        type: 'warning',
        showClose: true
      })
    }
  }
  //請求課程接口
}



/**
 * 搜索框的邏輯
 */
const inputValue = ref('')
//搜索的邏輯
const courseList = computed(() => {
  return data.list?.filter((item) => {
    return item.title.indexOf(inputValue.value) >= 0
  })
})
//搜索的按钮
const handleClick = () => {
  if (inputValue.value) {
    ElMessage({
      message: '查詢成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: '请输入搜索内容',
      type: 'error'
    })
  }
}




/**
 * 課程編輯的邏輯
 */
//編輯的數據
const courseItemState = reactive({
  message: {}
})
//控制編輯彈窗的展示變量
const popShow = ref(false)
//控制編輯彈窗的展示方法
const isShowPop = (show) => {
  popShow.value = show
}
//編輯的按紐
const editClick = (val) => {
  isShowPop(true)
  courseItemState.message = val
}
//取消和確認按紐邏輯
const confirmClick = (val) => {
  if (val === 'cancel') {
    isShowPop(false)
  } else if (val.title !== courseItemState.message.title || val.price !== courseItemState.message.price) {
    //更改對應課程的title或者price
    data.list.map((item) => {
      if (item.id === val.id) {
        item.title = val.title
        item.price = val.price
      }
    })
    //Close彈窗
    isShowPop(false)
    //修改接口的調用
  } else {
    ElMessage({
      showClose: true,
      message: '沒發現有更改的内容',
      type: 'warning'
    })
  }
}

/**
 * 課程刪除邏輯
 */
const deleteHandle = (val) => {
  if (val) {
    data.list = data.list.filter((item) => {
      return item.id !== val
    })
    //刪除接口
  }
}


</script>
<style lang='less' scoped>
.el-form {
  display: flex;
}

.main {
  background-color: #fff;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .input-with-select {
    width: 400px;
    margin-bottom: 40px;
  }
}

:deep(.el-table__header-wrapper) {
  position: fixed;
  z-index: 20;
}

:deep(.el-table__inner-wrapper) {
  overflow: hidden;
}

:deep(.el-table__body-wrapper) {
  margin-top: 40px;
}

:deep(.el-input__inner) {
  width: 300px;
  margin-right: 10px;
}

:deep(.warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9) !important;
  height: 140px !important;
}

.table {
  height: 80vh;
  width: 85vw;
  overflow: hidden;
  overflow-y: scroll;
}

.table::-webkit-scrollbar {
  display: none
}
</style>