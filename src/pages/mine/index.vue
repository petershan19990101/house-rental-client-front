<template>
  <view class="page">
    <!-- LOGO-02：四处同一标识与同一主色 -->
    <view class="brandbar">
      <image class="brand-logo" src="/static/brand/logo-anju.svg" />
      <text class="brand-name">安居租</text>
    </view>

    <view class="card">
      <view class="row">
        <view>
          <view class="h3">{{ phone || '未登录' }}</view>
          <view class="sub">{{ phone ? '身份：租客 · 多租约用户' : '登录后可查看租约、合同与工单' }}</view>
        </view>
        <!-- IX-06：未登录展示登录/注册主按钮（主色实心） -->
        <view v-if="!phone" class="btn btn--sm" style="margin-top:0;flex:0 0 auto;padding:0 16px" hover-class="hover-strong" @click="toLogin">登录 / 注册</view>
      </view>
    </view>

    <!-- IX-07 + VIS-03：图标 + 分组标题 + 分组间距，行高 ≥48px -->
    <view class="group">
      <view class="group-title">租约与费用</view>
      <view class="list-row" hover-class="hover-bg" @click="to('/pages/lease/list')">
        <image class="list-icon" src="/static/icons/ic-lease.svg" />
        <text class="list-label">我的租约</text>
        <text class="list-value">租期与付款计划</text>
        <image class="list-arrow" src="/static/icons/ic-arrow.svg" style="width:14px;height:14px" />
      </view>
      <view class="list-row" hover-class="hover-bg" @click="to('/pages/repair/list')">
        <image class="list-icon" src="/static/icons/ic-repair.svg" />
        <text class="list-label">我的工单</text>
        <text class="list-value">报修进度</text>
        <image class="list-arrow" src="/static/icons/ic-arrow.svg" style="width:14px;height:14px" />
      </view>
      <view class="list-row" hover-class="hover-bg" @click="to('/pages/contract/detail')">
        <image class="list-icon" src="/static/icons/ic-contract.svg" />
        <text class="list-label">合同文件</text>
        <text class="list-value">查看与签署</text>
        <image class="list-arrow" src="/static/icons/ic-arrow.svg" style="width:14px;height:14px" />
      </view>
      <view class="list-row" hover-class="hover-bg" @click="to('/pages/checkout/settle')">
        <image class="list-icon" src="/static/icons/ic-checkout.svg" />
        <text class="list-label">退租结算单</text>
        <text class="list-value">费用明细</text>
        <image class="list-arrow" src="/static/icons/ic-arrow.svg" style="width:14px;height:14px" />
      </view>
    </view>

    <view class="group">
      <view class="group-title">账号与设置</view>
      <view class="list-row">
        <image class="list-icon" src="/static/icons/ic-contact.svg" />
        <text class="list-label">紧急联系人</text>
        <text class="list-value">待完善</text>
        <image class="list-arrow" src="/static/icons/ic-arrow.svg" style="width:14px;height:14px" />
      </view>
      <view class="list-row">
        <image class="list-icon" src="/static/icons/ic-privacy.svg" />
        <text class="list-label">隐私设置</text>
        <text class="list-value">仅本人可见</text>
        <image class="list-arrow" src="/static/icons/ic-arrow.svg" style="width:14px;height:14px" />
      </view>
    </view>

    <!-- IX-06：按登录态渲染操作集，未登录不出现退出登录 -->
    <view v-if="phone" class="btn ghost" hover-class="hover-soft" @click="logout">退出登录</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const phone = ref(uni.getStorageSync('phone') || '')
const to = (url: string) => uni.navigateTo({ url })
const toLogin = () => uni.navigateTo({ url: '/pages/login/login' })
const logout = () => {
  uni.removeStorageSync('partyId')
  uni.removeStorageSync('phone')
  uni.reLaunch({ url: '/pages/login/login' })
}
</script>
