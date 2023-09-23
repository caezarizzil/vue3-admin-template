<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          status-icon
        >
          <h1>Vue3-TS-Admin</h1>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              size="large"
              clearable
              v-model="loginForm.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              show-password
              size="large"
              clearable
              v-model="loginForm.password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="large"
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { getTime } from '@/utils/time'

const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

// 加载效果开关
const loading = ref(false)

// 表单组件对象
const loginFormRef = ref<FormInstance>()

// 登录表单数据
const loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
})

// 用户名校验器
// @ts-ignore
const validateUsername = (rule: any, value: any, callback: any) => {
  // rule: 校验规则对象
  // value: 输入的值
  // callback: 回调函数
  if (/^(?!\s*$).{5,10}$/.test(value)) {
    callback()
  } else {
    callback(new Error('用户名长度为5-10位'))
  }
}

// 密码校验器
// @ts-ignore
const validatePassword = (rule: any, value: any, callback: any) => {
  // rule: 校验规则对象
  // value: 输入的值
  // callback: 回调函数
  if (/^(?!\s*$).{6,16}$/.test(value)) {
    callback()
  } else {
    callback(new Error('密码长度为6-16位'))
  }
}

// 表单校验对象
const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ validator: validateUsername, trigger: 'change' }],
  password: [{ validator: validatePassword, trigger: 'change' }],
})

// 登录按钮回调
const handleLogin = async () => {
  // 表单验证全部通过再发请求
  await loginFormRef.value?.validate()
  // 禁用按钮，开启加载效果
  loading.value = true
  try {
    // 保证登录成功
    await userStore.userLogin(loginForm)
    // 判断登录时有没有query参数，有就跳转到指定页面，没有就跳转到首页
    const redirect = $route.query.redirect
    // 跳转到首页
    $router.push({path: redirect as string || '/'})
    // 提示登录成功
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `Hi~,${getTime()}好`,
    })
  } catch (error) {
    // 提示登录失败
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    // 关闭加载效果
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 60%;
    top: 30vh;
    left: 20vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(255, 255, 255, 0.1);
    padding: 40px;

    h1 {
      color: white;
      text-align: center;
      font-size: 40px;
      margin-bottom: 30px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
