<template>
  <view class="page">
    <view class="h1">报维修</view>
    <view class="field"><view class="label">关联租约</view><text class="input">{{ lease.property }}</text></view>
    <view class="label">维修类型</view>
    <view class="chips">
      <view v-for="c in categories" :key="c" class="chip" :class="{ on: c === category }" @click="category = c">{{ c }}</view>
    </view>
    <view class="field"><view class="label">问题描述</view><textarea v-model="desc" class="input" placeholder="如厨房水管漏水，已持续一天" /></view>
    <view class="field"><view class="label">期望上门时间</view><input v-model="expect" class="input" placeholder="如今天 18:00" /></view>
    <view class="label">上传照片</view>
    <view class="chips">
      <view class="chip" @click="photos++">＋ 添加照片</view>
      <view class="chip">已选 {{ photos }} 张</view>
    </view>
    <view class="btn" @click="submit">提交报修</view>
    <view class="sub" style="margin-top:12px">提交后可在「我的工单」查看进度，管理端同步生成维修工单待办。</view>
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
const categories = ['水电', '门窗', '家电', '网络', '其他']
const category = ref('水电')
const desc = ref('')
const expect = ref('')
const photos = ref(0)
const submit = async () => {
  if (!desc.value) return uni.showToast({ title: '请填写问题描述', icon: 'none' })
  await sendCommand('REPAIR_CREATE', { leaseId: lease.value.id, category: category.value, desc: desc.value, expect: expect.value, photos: photos.value })
  uni.showToast({ title: '报修已提交' })
  setTimeout(() => uni.navigateTo({ url: '/pages/repair/list' }), 800)
}
</script>
