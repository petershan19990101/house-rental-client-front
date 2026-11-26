<template>
  <view class="page">
    <!-- LOGO-01/02/03 + STY-01：首屏品牌区（图形标识 + 品牌名 + 主色容器，高度 ≥48px） -->
    <view class="brandbar">
      <image class="brand-logo" src="/static/brand/logo-anju.svg" />
      <text class="brand-name">安居租</text>
      <text class="brand-slogan">真实房源 · 安心租住</text>
    </view>

    <!-- IX-02 + VIS-02：明确搜索主操作（输入框 + 主色搜索按钮） -->
    <view class="searchbar">
      <input class="search-input" v-model="keyword" placeholder="搜索区域 / 价格 / 户型 / 整租合租" placeholder-class="search-ph" confirm-type="search" @confirm="onSearch" />
      <view class="search-btn" hover-class="hover-strong" @click="onSearch">
        <image src="/static/icons/ic-search.svg" style="width:16px;height:16px;margin-right:4px" />
        <text>搜索</text>
      </view>
    </view>

    <!-- IX-02：筛选（区域/价格/户型/整租合租）可视化展开面板 -->
    <view class="filter-bar">
      <view v-for="f in filters" :key="f.key" class="filter-trigger" :class="{ on: openFilter === f.key, filled: !!selected[f.key] }" hover-class="hover-bg" @click="toggleFilter(f.key)">
        <text>{{ selected[f.key] || f.label }}</text>
        <text class="caret">▾</text>
      </view>
    </view>
    <view v-if="openFilter" class="filter-panel">
      <view v-for="opt in currentOptions" :key="opt" class="filter-option" :class="{ on: selected[openFilter] === opt }" hover-class="hover-soft" @click="pickOption(opt)">{{ opt }}</view>
    </view>

    <view class="h2">推荐房源</view>
    <!-- VIS-01/03/04：白卡 + 描边 + 轻阴影；关键属性行用二级文字；状态标签按体系换色 -->
    <view v-for="p in properties" :key="p.id" class="card" hover-class="hover-bg" @click="to('/pages/property/detail?id=' + p.id)">
      <view class="row">
        <text class="h3">{{ p.title }}</text>
        <StateTag :display-status="p.displayStatus" :tone="p.tone" />
      </view>
      <view class="sub">{{ p.region }} · {{ p.layout }} · {{ p.rent }} 元/月</view>
    </view>

    <view class="h2">我的快捷入口</view>
    <!-- IX-05/IX-07 + STY-02：统一线性图标 + 文字，等距栅格 -->
    <view class="quick-grid">
      <view class="quick-item" hover-class="hover-bg" @click="to('/pages/lease/list')">
        <image class="quick-icon" src="/static/icons/ic-lease.svg" />
        <text class="quick-label">我的租约</text>
        <text class="quick-desc">查看租期、租金与付款计划</text>
      </view>
      <view class="quick-item" hover-class="hover-bg" @click="to('/pages/repair/create')">
        <image class="quick-icon" src="/static/icons/ic-repair.svg" />
        <text class="quick-label">报维修</text>
        <text class="quick-desc">提交后可在我的工单查看进度</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import StateTag from '../../components/StatusTag.vue'
import { properties } from '../../api/demo'

const to = (url: string) => uni.navigateTo({ url })

// 仅页内筛选项与展开状态，不新增业务字段、不新增接口参数
const keyword = ref('')
const filters = [
  { key: 'region', label: '区域', options: ['不限', '朝阳', '海淀', '西城'] },
  { key: 'price', label: '价格', options: ['不限', '3000以下', '3000-5000', '5000以上'] },
  { key: 'layout', label: '户型', options: ['不限', '一居', '两居', '三居'] },
  { key: 'rentType', label: '整租合租', options: ['不限', '整租', '合租'] }
]
const selected = ref<Record<string, string>>({})
const openFilter = ref('')
const currentOptions = computed(() => filters.find((f) => f.key === openFilter.value)?.options || [])
const toggleFilter = (key: string) => { openFilter.value = openFilter.value === key ? '' : key }
const pickOption = (opt: string) => {
  const key = openFilter.value
  if (!key) return
  if (opt === '不限') {
    const next = { ...selected.value }
    delete next[key]
    selected.value = next
  } else {
    selected.value = { ...selected.value, [key]: opt }
  }
  openFilter.value = ''
}
// IX-01：点击即时反馈，随后沿用基线跳转（既有页面，无新增路由）
const onSearch = () => {
  uni.showToast({ title: '正在为你筛选房源', icon: 'none' })
  to('/pages/property/list')
}
</script>
