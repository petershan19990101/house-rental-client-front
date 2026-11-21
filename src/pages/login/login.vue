<template>
  <view class="page">
    <view class="h1">安居租 · 登录</view>
    <view class="field"><view class="label">手机号</view><input v-model="phone" class="input" placeholder="请输入手机号" /></view>
    <view class="field"><view class="label">验证码</view><input v-model="code" class="input" placeholder="请输入短信验证码" /></view>
    <view class="row" @click="agree = !agree">
      <text class="sub">{{ agree ? '☑' : '☐' }} 我已阅读并同意《用户协议》与《隐私政策》</text>
    </view>
    <view class="btn" :class="{ disabled: !agree }" @click="login">登录</view>
    <view class="sub" style="margin-top:12px">未注册手机号验证后将自动创建账号</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const phone = ref('')
const code = ref('')
const agree = ref(false)

const login = () => {
  if (!agree.value) return uni.showToast({ title: '请先勾选协议', icon: 'none' })
  if (!/^1\d{10}$/.test(phone.value)) return uni.showToast({ title: '请输入正确手机号', icon: 'none' })
  uni.setStorageSync('partyId', 'party-' + phone.value.slice(-4))
  uni.setStorageSync('phone', phone.value)
  uni.switchTab({ url: '/pages/index/index' })
}
</script>
