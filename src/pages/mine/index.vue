<template>
  <view class="page">
    <view class="card">
      <view class="h3">{{ phone || '未登录' }}</view>
      <view class="sub">身份：租客 · 多租约用户</view>
    </view>
    <view class="card">
      <view class="list-item" @click="to('/pages/lease/list')"><view class="row"><text class="input">我的租约</text><text class="sub">›</text></view></view>
      <view class="list-item" @click="to('/pages/repair/list')"><view class="row"><text class="input">我的工单</text><text class="sub">›</text></view></view>
      <view class="list-item" @click="to('/pages/contract/detail')"><view class="row"><text class="input">合同文件</text><text class="sub">›</text></view></view>
      <view class="list-item" @click="to('/pages/checkout/settle')"><view class="row"><text class="input">退租结算单</text><text class="sub">›</text></view></view>
    </view>
    <view class="card">
      <view class="list-item"><view class="row"><text class="input">紧急联系人</text><text class="sub">待完善</text></view></view>
      <view class="list-item"><view class="row"><text class="input">隐私设置</text><text class="sub">›</text></view></view>
    </view>
    <view class="btn ghost" @click="logout">退出登录</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const phone = ref(uni.getStorageSync('phone') || '')
const to = (url: string) => uni.navigateTo({ url })
const logout = () => {
  uni.removeStorageSync('partyId')
  uni.removeStorageSync('phone')
  uni.reLaunch({ url: '/pages/login/login' })
}
</script>
