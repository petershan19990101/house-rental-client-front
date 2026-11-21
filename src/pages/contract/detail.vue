<template>
  <view class="page">
    <view class="h1">合同签署</view>
    <view class="steps">
      <view class="step" :class="{ on: step >= 1 }">① 阅读合同</view>
      <view class="step" :class="{ on: step >= 2 }">② 实名确认</view>
      <view class="step" :class="{ on: step >= 3 }">③ 手写签名</view>
    </view>
    <view v-if="step === 1" class="card">
      <view class="h3">房屋租赁合同（全文可滚动）</view>
      <view class="timeline" style="margin-top:8px">出租方：安居租（北京）资产管理有限公司；承租方：张女士。房屋：阳光花园A1-2-1503。租期 2026-03-01 至 2027-02-28，月租 5200 元，押金 10400 元，付款方式押一付三。双方权利义务、维修责任、退租与违约责任按平台标准条款执行。</view>
      <view class="row" style="margin-top:12px" @click="read = !read"><text class="sub">{{ read ? '☑' : '☐' }} 我已阅读并同意以上条款</text></view>
      <view class="btn" :class="{ disabled: !read }" @click="next">下一步</view>
    </view>
    <view v-else-if="step === 2" class="card">
      <view class="h3">实名确认</view>
      <view class="sub">姓名 张**　证件号 110***********6721</view>
      <view class="sub">信息由签约时管理端存档，如有变更请联系经纪人。</view>
      <view class="btn" @click="step = 3">信息无误，下一步</view>
    </view>
    <view v-else class="card">
      <view class="h3">手写签名</view>
      <view class="sub">请在下方签名区域确认姓名（演示环境以文本代替手写轨迹）</view>
      <view class="field" style="margin-top:8px"><text class="input">{{ sign || '待签名' }}</text></view>
      <view class="chips">
        <view class="chip" @click="sign = '张女士'">张女士</view>
        <view class="chip" @click="sign = ''">重签</view>
      </view>
      <view class="btn" :class="{ disabled: !sign }" @click="submit">提交签署</view>
      <view class="sub" style="margin-top:12px">提交后状态同步至管理端签约跟踪，签署结果可在租约详情查看。</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { sendCommand } from '../../utils/api'

const step = ref(1)
const read = ref(false)
const sign = ref('')
const leaseId = ref('LT-2026-0871')
onLoad((q: any) => { if (q && q.leaseId) leaseId.value = q.leaseId })

const next = () => {
  if (!read.value) return uni.showToast({ title: '请先阅读并同意条款', icon: 'none' })
  step.value = 2
}
const submit = async () => {
  if (!sign.value) return uni.showToast({ title: '请先完成签名', icon: 'none' })
  await sendCommand('CONTRACT_SIGN', { leaseId: leaseId.value, signerName: sign.value })
  uni.showToast({ title: '签署已提交' })
  setTimeout(() => uni.navigateBack(), 800)
}
</script>
