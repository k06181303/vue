<template>
  <div class="login">
    <div class="bgp"></div>
    <div class="login_container">
      <h1>小滴课程管理系统</h1>
      <el-form class="login_form" :model="userInfo" :rules="rules" @keyup.enter="onLogin" ref="ref_form">
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
        <el-button type="primary" class="login_submit" @click="onLogin">Login</el-button>
        <div class="login_register" @click="toGo">Sign Up</div>
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
  userName: [{ required: 'true', trigger: 'blur', message: 'UserName Cannot Be Empty' }],
  password: [{ required: 'true', trigger: 'blur', message: 'Password Cannot Be Empty' }],
}
/**
 * Login的方法
 */
const onLogin = () => {
  ref_form.value.validate((val) => {
    if (val) {
      getLoginData()
    }
  })
}
/**
 * 登入的接口
 */
const getLoginData = () => {
  //接口的調用

  //如果登入成功
  localStorage.setItem('token', 1)
  ElMessage({
    message: 'Login！！！',
    type: 'success',
  })
  router.push('/home')
}
/**
 * 跳轉到註冊
 */
const toGo = () => {
  router.push('/register')
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

.login {
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

  .login_container {
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

    .login_form {
      .login_submit {
        width: 100%;
        height: 50px;
        border-radius: 20px;
        margin-bottom: 10px;
      }

      .login_register {
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