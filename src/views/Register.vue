<template>
  <div class="register">
    <div class="bgp"></div>
    <div class="register_container">
      <h1>小滴课程管理系统</h1>
      <el-form class="register_form" :model="userInfo" :rules="rules" @keyup.enter="onRegister" ref="ref_form">
        <el-form-item prop="userName">
          <el-input placeholder="Please Enter Your UserName" v-model.trim="userInfo.userName">
            <template #prepend>
              <el-icon>
                <avatar />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="Please Enter Your Password" show-password v-model.trim="userInfo.password">
            <template #prepend>
              <el-icon>
                <key />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" class="register_submit" @click="onRegister">Register</el-button>
        <div class="register_register" @click="toGo">Have Account? Login !</div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import router from '../router/index';
import { reactive, ref } from 'vue'
/**
 * 初始的ref
 */
const ref_form = ref(null)
/**
 * 表單的數據聲明
 */
const userInfo = reactive({
  userName: '',
  password: ''
})
/**
 * 表單數據規則
 */
const rules = {
  userName: [{ required: 'true', trigger: 'blur', message: '用户名不能为空' }],
  password: [{ required: 'true', trigger: 'blur', message: '密码不能为空' }],
}
/**
 * 註冊的方法
 */
const onRegister = () => {
  ref_form.value.validate((val) => {
    if (val) {
      getRegisterData()
    }
  })
}
/**
 * 註冊的接口
 */
const getRegisterData = () => {
  //接口的調用

  // 如果註冊成功
  ElMessage({
    message: '註冊成功！！！',
    type: 'success',
  })
  router.push('/login')
}
/**
 * 跳轉到登入頁面
 */
const toGo = () => {
  router.push('/login')
}
</script>
<style lang='less' scoped>
@-webkit-keyframes fadenum {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.register {
  height: 100%;

  .bgp {
    height: 100%;
    background-image: url("../assets/bj.jpeg");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 50% 50%;
  }

  .el-icon {
    height: 30px !important;
  }

  .register_container {
    animation: fadenum 1s ease;
    position: absolute;
    z-index: 1;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 1s;
    min-height: 273px;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;

    h1 {
      font-size: 24px;
      transition: all 1s;
      font-weight: bold;
      margin-bottom: 36px;
    }

    .el-card {
      border-radius: 20px;
    }

    .register_form {
      .register_submit {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        margin-bottom: 10px;
      }

      .register_register {
        width: 6.25rem;
        font-size: 0.875rem;
        margin: 0 auto;
      }

      :deep(.el-input-group__prepend) {
        padding: 0 10px;
      }
    }
  }
}
</style>