<template>
  <view class="page">
    <view class="card">
      <view class="row">
        <text class="h3">{{ lease.property }}</text>
        <StateTag :display-status="lease.displayStatus" :tone="lease.tone" />
      </view>
      <view class="sub">租期 {{ lease.period }}</view>
      <view class="row" style="margin-top:8px">
        <text class="num">¥{{ lease.rent }}</text>
        <text class="sub">押金 ¥{{ lease.deposit }} · 押一付三</text>
      </view>
    </view>
    <view class="card">
      <view class="h2">快捷操作</view>
      <view class="btn ghost" @click="to('/pages/contract/detail?leaseId=' + lease.id)">查看合同/签署</view>
      <view class="btn ghost" @click="to('/pages/repair/create?leaseId=' + lease.id)">报维修</view>
      <view class="btn ghost" @click="pay">付款计划</view>
      <view class="btn danger" @click="to('/pages/checkout/create?leaseId=' + lease.id)">申请退租</view>
    </view>
    <view class="card">
      <view class="h2">租约时间线</view>
      <view class="timeline">03-01 合同生效</view>
      <view class="timeline">03-04 入住回访：满意</view>
      <view class="timeline">05-12 维修工单完成：厨房水管</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import StateTag from '../../components/StatusTag.vue'
import { leases } from '../../api/demo'

const id = ref('')
onLoad((q: any) => { if (q && q.leaseId) id.value = q.leaseId })
const lease = computed(() => leases.find((l) => l.id === id.value) || leases[0])
const to = (url: string) => uni.navigateTo({ url })
const pay = () => uni.showToast({ title: '付款计划：押一付三', icon: 'none' })
</script>
