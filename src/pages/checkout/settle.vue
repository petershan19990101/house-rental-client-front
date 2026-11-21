<template>
  <view class="page">
    <view class="h1">退租结算单</view>
    <view class="card">
      <view class="row"><text class="h3">押金</text><text class="num">¥{{ lease.deposit }}</text></view>
      <view class="list-item"><view class="row"><text class="sub">水电燃气结清</text><text class="sub">-¥180</text></view></view>
      <view class="list-item"><view class="row"><text class="sub">保洁费用</text><text class="sub">-¥200</text></view></view>
      <view class="list-item"><view class="row"><text class="sub">设施损坏扣款</text><text class="sub">-¥0</text></view></view>
      <view class="row" style="margin-top:12px"><text class="h3">应退金额</text><text class="num">¥{{ refund }}</text></view>
    </view>
    <view class="card">
      <view class="h2">结算说明</view>
      <view class="sub">结算单由管理端生成，款项经线下或第三方支付渠道退回，平台本期不实现真实资金收付与押金托管。</view>
    </view>
    <view class="btn" @click="confirm">确认结算单</view>
    <view class="btn ghost" @click="appeal">有异议，提交申诉</view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { leases } from '../../api/demo'
import { sendCommand } from '../../utils/api'

const leaseId = ref('')
onLoad((q: any) => { if (q && q.leaseId) leaseId.value = q.leaseId })
const lease = computed(() => leases.find((l) => l.id === leaseId.value) || leases[0])
const refund = computed(() => lease.value.deposit - 380)
const confirm = () => uni.showToast({ title: '已确认结算单' })
const appeal = async () => {
  await sendCommand('TERMINATION_APPLY', { leaseId: lease.value.id, action: 'APPEAL' })
  uni.showToast({ title: '申诉已提交' })
}
</script>
