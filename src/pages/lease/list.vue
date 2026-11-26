<template>
  <view class="page">
    <!-- LOGO-02：四处同一标识；IX-04：页面标题仅保留标题栏一处 -->
    <view class="brandbar">
      <image class="brand-logo" src="/static/brand/logo-anju.svg" />
      <text class="brand-name">安居租</text>
    </view>

    <view class="seg">
      <view v-for="g in ['在租', '历史']" :key="g" class="seg-item" :class="{ on: g === tab }" hover-class="hover-bg" @click="tab = g">{{ g }}</view>
    </view>

    <!-- IX-08 + IX-01：刷新改为次级按钮，配套更新时间戳与结果反馈 -->
    <view class="toolbar">
      <text class="toolbar-hint">{{ refreshedAt ? ('更新于 ' + refreshedAt) : '当前为进入页面时的状态' }}</text>
      <view class="btn btn--ghost btn--sm" :class="{ 'is-loading': loading }" hover-class="hover-soft" @click="query">
        <image src="/static/icons/ic-refresh.svg" style="width:16px;height:16px;margin-right:6px" />
        <text>{{ loading ? '刷新中…' : '刷新' }}</text>
      </view>
    </view>
    <view v-if="tip" class="alert" :class="tipOk ? 'alert--ok' : 'alert--fail'">
      <text>{{ tip }}</text>
      <text v-if="!tipOk" class="alert-action" @click="query">重试</text>
    </view>

    <!-- VIS-01/03/04：卡片层级；在租标签走蓝色系（VIS-04） -->
    <view v-for="l in shown" :key="l.id" class="card" hover-class="hover-bg" @click="open(l.id)">
      <view class="row">
        <text class="h3">{{ l.property }}</text>
        <StateTag :display-status="l.displayStatus" :tone="l.tone" />
      </view>
      <view class="kv">租期 {{ l.period }}</view>
      <view class="kv">月租 ¥{{ l.rent }} · 押金 ¥{{ l.deposit }}</view>
    </view>

    <!-- VIS-05 + IX-08：空态文案 + 下一步操作，压缩无内容留白 -->
    <view v-if="!shown.length" class="card empty">
      <image class="empty-icon" src="/static/icons/ic-lease.svg" />
      <view class="empty-text">暂无{{ tab }}租约</view>
      <view class="empty-action" hover-class="hover-strong" @click="toHome">去首页找房</view>
    </view>
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

// IX-01/IX-08：进行中、成功（时间戳）、失败（原因 + 重试）；接口调用与基线完全一致
const loading = ref(false)
const tip = ref('')
const tipOk = ref(false)
const refreshedAt = ref('')
const stamp = () => {
  const d = new Date()
  const p = (n: number) => (n < 10 ? '0' + n : '' + n)
  return p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds())
}
const query = async () => {
  if (loading.value) return
  loading.value = true
  tip.value = ''
  const res = await sendCommand('LEASE_QUERY', {})
  loading.value = false
  refreshedAt.value = stamp()
  if (res && res.ok) {
    tipOk.value = true
    tip.value = '租约状态已刷新'
    uni.showToast({ title: '已刷新' })
  } else {
    tipOk.value = false
    tip.value = res && res.offline ? '网络不可用，请检查网络后重试' : '刷新失败，请稍后重试'
  }
}
const toHome = () => uni.switchTab({ url: '/pages/index/index' })
</script>
