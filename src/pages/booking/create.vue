<template>
  <view class="page">
    <view class="h1">预约看房</view>
    <view class="card">
      <view class="h3">{{ property.title }}</view>
      <view class="sub">{{ property.region }} · {{ property.layout }} · {{ property.rent }} 元/月</view>
    </view>
    <view class="field"><view class="label">看房时间</view><input v-model="time" class="input" placeholder="如 2026-11-20 18:00" /></view>
    <view class="field"><view class="label">联系方式</view><input v-model="contact" class="input" placeholder="请输入手机号" /></view>
    <view class="chips">
      <view v-for="t in slots" :key="t" class="chip" :class="{ on: t === time }" @click="time = t">{{ t }}</view>
    </view>
    <view class="btn" @click="submit">提交预约</view>
    <view class="sub" style="margin-top:12px">提交后将在管理端生成带看待办，经纪人会与您确认。</view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { properties } from '../../api/demo'
import { sendCommand } from '../../utils/api'

const id = ref('')
onLoad((q: any) => { if (q && q.id) id.value = q.id })
const property = computed(() => properties.find((p) => p.id === id.value) || properties[0])
const slots = ['今天 18:00', '明天 10:00', '明天 15:00', '周六 10:00']
const time = ref('')
const contact = ref('')
const submit = async () => {
  if (!time.value) return uni.showToast({ title: '请选择看房时间', icon: 'none' })
  await sendCommand('VIEWING_REQUEST', { propertyId: property.value.id, time: time.value, contact: contact.value })
  uni.showToast({ title: '预约已提交' })
  setTimeout(() => uni.switchTab({ url: '/pages/index/index' }), 800)
}
</script>
