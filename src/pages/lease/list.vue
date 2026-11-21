<template>
  <view class="page">
    <view class="h1">我的租约</view>
    <view class="chips">
      <view v-for="g in ['在租', '历史']" :key="g" class="chip" :class="{ on: g === tab }" @click="tab = g">{{ g }}</view>
    </view>
    <view v-for="l in shown" :key="l.id" class="card" @click="open(l.id)">
      <view class="row">
        <text class="h3">{{ l.property }}</text>
        <StateTag :display-status="l.displayStatus" :tone="l.tone" />
      </view>
      <view class="sub">租期 {{ l.period }}</view>
      <view class="sub">月租 ¥{{ l.rent }} · 押金 ¥{{ l.deposit }}</view>
    </view>
    <view v-if="!shown.length" class="empty">暂无该分组租约</view>
    <view class="btn ghost" @click="query">刷新租约状态</view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import StateTag from '../../components/StatusTag.vue'
import { leases } from '../../api/demo'
import { sendCommand } from '../../utils/api'

const tab = ref('在租')
const shown = computed(() => leases.filter((l) => (tab.value === '在租' ? l.displayStatus === '在租' : l.displayStatus !== '在租')))
const open = (id: string) => uni.navigateTo({ url: '/pages/lease/detail?id=' + id })
const query = async () => {
  await sendCommand('LEASE_QUERY', {})
  uni.showToast({ title: '已刷新' })
}
</script>
