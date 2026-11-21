<template>
  <view class="page">
    <view class="card">
      <view class="row">
        <text class="h3">{{ item.title }}</text>
        <StateTag :display-status="item.displayStatus" :tone="item.tone" />
      </view>
      <view class="sub">{{ item.region }} · {{ item.layout }} · {{ item.rent }} 元/月</view>
      <view class="timeline" style="margin-top:8px">{{ item.desc }}</view>
    </view>
    <view class="card">
      <view class="h2">经纪人名片</view>
      <view class="sub">李四 · 阳光花园门店 · 138****8899</view>
    </view>
    <view class="card">
      <view class="h2">配套与位置</view>
      <view class="sub">电梯 · 空调 · 洗衣机 · 冰箱 · 近地铁6号线 500m</view>
    </view>
    <view class="btn" @click="book">预约看房</view>
    <view class="btn ghost" @click="fav">收藏房源</view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import StateTag from '../../components/StatusTag.vue'
import { properties } from '../../api/demo'
import { sendCommand } from '../../utils/api'

const id = ref('')
onLoad((q: any) => { if (q && q.id) id.value = q.id })
const item = computed(() => properties.find((p) => p.id === id.value) || properties[0])
const book = async () => {
  await sendCommand('PROPERTY_DETAIL', { propertyId: item.value.id })
  uni.navigateTo({ url: '/pages/booking/create?id=' + item.value.id })
}
const fav = () => uni.showToast({ title: '已收藏' })
</script>
