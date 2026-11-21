<template>
  <view class="page">
    <view class="h1">消息中心</view>
    <view v-for="m in messages" :key="m.id" class="card">
      <view class="row">
        <text class="h3">{{ m.title }}</text>
        <text v-if="m.unread" class="sub" style="color:#EF4444">未读</text>
      </view>
      <view class="sub">{{ m.body }}</view>
      <view class="sub">{{ m.createdAt }}</view>
    </view>
    <view v-if="!messages.length" class="empty">暂无消息</view>
  </view>
</template>

<script setup lang="ts">
import { messages } from '../../api/demo'
</script>
