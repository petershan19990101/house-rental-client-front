<template>
  <view class="page">
    <view class="h1">线上退租申请</view>
    <view class="field"><view class="label">关联租约</view><text class="input">{{ lease.property }}</text></view>
    <view class="field"><view class="label">期望退租日期</view><input v-model="date" class="input" placeholder="如 2027-02-20" /></view>
    <view class="label">退租原因</view>
    <view class="chips">
      <view v-for="r in reasons" :key="r" class="chip" :class="{ on: r === reason }" @click="reason = r">{{ r }}</view>
    </view>
    <view class="field"><view class="label">补充说明</view><textarea v-model="note" class="input" placeholder="可说明房屋现状与交接要求" /></view>
    <view class="label">房屋现状照片</view>
    <view class="chips"><view class="chip" @click="photos++">＋ 添加照片</view><view class="chip">已选 {{ photos }} 张</view></view>
    <view class="btn danger" @click="submit">提交退租申请</view>
    <view class="sub" style="margin-top:12px">提交后进入管理端退租审核，审核通过将生成结算单。</view>
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
const date = ref('')
const reasons = ['工作变动', '换城市', '租金调整', '房屋问题', '其他']
const reason = ref('')
const note = ref('')
const photos = ref(0)
const submit = async () => {
  if (!date.value || !reason.value) return uni.showToast({ title: '请填写退租日期与原因', icon: 'none' })
  await sendCommand('TERMINATION_APPLY', { leaseId: lease.value.id, date: date.value, reason: reason.value, note: note.value, photos: photos.value })
  uni.showToast({ title: '申请已提交' })
  setTimeout(() => uni.navigateTo({ url: '/pages/checkout/settle?leaseId=' + lease.value.id }), 800)
}
</script>
