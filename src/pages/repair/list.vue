<template>
  <view class="page">
    <view class="h1">我的工单</view>
    <view v-for="r in repairs" :key="r.id" class="card">
      <view class="row">
        <text class="h3">{{ r.category }} · {{ r.id }}</text>
        <StateTag :display-status="r.displayStatus" :tone="r.tone" />
      </view>
      <view class="sub">{{ r.desc }}</view>
      <view class="sub">提交时间 {{ r.createdAt }}</view>
      <view v-if="r.displayStatus === '待客户验收' || r.displayStatus === '处理中'" class="btn ghost" @click="accept(r.id)">验收并评价</view>
    </view>
    <view v-if="!repairs.length" class="empty">暂无工单，去报修</view>
    <view class="btn" @click="query">刷新工单</view>
  </view>
</template>

<script setup lang="ts">
import StateTag from '../../components/StatusTag.vue'
import { repairs } from '../../api/demo'
import { sendCommand } from '../../utils/api'

const query = async () => {
  await sendCommand('REPAIR_QUERY', {})
  uni.showToast({ title: '已刷新' })
}
const accept = (id: string) => uni.showToast({ title: '已提交验收：' + id, icon: 'none' })
</script>
