<template>
  <el-dialog title="Edit" v-model="popShow" width="30%" center :show-close="false">
    <el-form :model="editData" ref="ruleFromRef">
      <el-form-item label="Course Title" prop="title" required>
        <el-input v-model='editData.title' />
      </el-form-item>
      <el-form-item label="Course Price" prop="price" required>
        <el-input v-model='editData.price' />
      </el-form-item>
      <el-form-item>
        <el-button @click="confirmClick('cancel')">Cancel</el-button>
        <el-button type="primary" @click="submitForm(ruleFromRef)">Confirm</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { defineProps, reactive, ref } from 'vue';
const { popShow, message, confirmClick } = defineProps(['popShow', 'message', 'confirmClick'])
/**
 * Edit附件維護
 */
const editData = reactive({
  title: message.title,
  price: message.price,
  id: message.id
})
/**
 * 表單校驗
 */
const ruleFromRef = ref(null)
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      confirmClick({ title: editData.title, price: editData.price, id: editData.id })
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>
<style lang='less' scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

:deep(.el-form-item__label) {
  width: 80px !important;
}

:deep(.el-form-item__content) {
  justify-content: center;
  margin-left: 0 !important;
}
</style>