<template>
  <view class="page page--with-bar">
    <!-- LOGO-02：四处同一标识；STY-03：圆角/阴影集合统一 -->
    <view class="brandbar">
      <image class="brand-logo" src="/static/brand/logo-anju.svg" />
      <text class="brand-name">安居租</text>
    </view>

    <!-- VIS-01/03：模块统一卡片 + 模块标题层级，去除多余浅色块 -->
    <view class="hero">
      <view class="row">
        <text class="h3">{{ item.title }}</text>
        <StateTag :display-status="item.displayStatus" :tone="item.tone" />
      </view>
      <view class="hero-price">¥{{ item.rent }} <text class="sub">元/月</text></view>
      <view class="kv"><text class="kv-key">户型　</text>{{ item.layout }}</view>
      <view class="kv"><text class="kv-key">区域　</text>{{ item.region }}</view>
    </view>

    <view class="mod">
      <view class="mod-title">
        <image class="mod-icon" src="/static/icons/ic-loc.svg" />
        <text>房源说明</text>
      </view>
      <view class="kv">{{ item.desc }}</view>
    </view>

    <view class="mod">
      <view class="mod-title">
        <image class="mod-icon" src="/static/icons/ic-agent.svg" />
        <text>经纪人名片</text>
      </view>
      <view class="kv">李四 · 阳光花园门店 · 138****8899</view>
    </view>

    <view class="mod">
      <view class="mod-title">
        <image class="mod-icon" src="/static/icons/ic-facility.svg" />
        <text>配套与位置</text>
      </view>
      <view class="kv">电梯 · 空调 · 洗衣机 · 冰箱 · 近地铁6号线 500m</view>
    </view>

    <!-- IX-03：固定底部操作栏，唯一主色实心主操作 + 描边次操作 -->
    <view class="bottom-bar">
      <view class="bottom-bar-inner">
        <view class="btn btn--ghost btn-bar-ghost" hover-class="hover-soft" @click="fav">
          <image src="/static/icons/ic-fav.svg" style="width:16px;height:16px;margin-right:6px" />
          <text>收藏房源</text>
        </view>
        <view class="btn btn-bar-primary" hover-class="hover-strong" @click="book">预约看房</view>
      </view>
    </view>
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
