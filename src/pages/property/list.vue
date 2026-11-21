<template>
  <view class="page">
    <view class="chips">
      <view v-for="c in filters" :key="c" class="chip" :class="{ on: c === active }" @click="active = c">{{ c }}</view>
    </view>
    <view v-for="p in shown" :key="p.id" class="card" @click="open(p.id)">
      <view class="row">
        <text class="h3">{{ p.title }}</text>
        <StateTag :display-status="p.displayStatus" :tone="p.tone" />
      </view>
      <view class="sub">{{ p.region }} · {{ p.layout }} · {{ p.rent }} 元/月</view>
    </view>
    <view v-if="!shown.length" class="empty">暂无符合条件的房源，试试放宽筛选</view>
    <view class="btn" @click="search">搜索房源</view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import StateTag from '../../components/StatusTag.vue'
import { properties } from '../../api/demo'
import { sendCommand } from '../../utils/api'

const filters = ['全部', '朝阳', '海淀', '西城']
const active = ref('全部')
const shown = computed(() => (active.value === '全部' ? properties : properties.filter((p) => p.region === active.value)))
const open = (id: string) => uni.navigateTo({ url: '/pages/property/detail?id=' + id })
const search = async () => {
  await sendCommand('PROPERTY_SEARCH', { region: active.value })
  uni.showToast({ title: '已提交搜索' })
}
</script>
