<template>
  <view class="page">
    <view class="h1">发现好房</view>
    <view class="field" @click="to('/pages/property/list')"><text class="input">搜索区域 / 价格 / 户型 / 整租合租</text></view>
    <view class="h2">推荐房源</view>
    <view v-for="p in properties" :key="p.id" class="card" @click="to('/pages/property/detail?id=' + p.id)">
      <view class="row">
        <text class="h3">{{ p.title }}</text>
        <StateTag :display-status="p.displayStatus" :tone="p.tone" />
      </view>
      <view class="sub">{{ p.region }} · {{ p.layout }} · {{ p.rent }} 元/月</view>
    </view>
    <view class="h2">我的快捷入口</view>
    <view class="card" @click="to('/pages/lease/list')"><text class="h3">我的租约</text><view class="sub">查看租期、租金与付款计划</view></view>
    <view class="card" @click="to('/pages/repair/create')"><text class="h3">报维修</text><view class="sub">提交后可在我的工单查看进度</view></view>
  </view>
</template>

<script setup lang="ts">
import StateTag from '../../components/StatusTag.vue'
import { properties } from '../../api/demo'

const to = (url: string) => uni.navigateTo({ url })
</script>
