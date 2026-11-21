<template>
  <text class="tag" :class="'tone-' + (tone || 'neutral')">{{ displayStatus }}</text>
</template>

<script setup lang="ts">
// 状态一律使用后端下发的 displayStatus 与 tone，前端不做状态文案映射
defineProps<{ displayStatus: string; tone?: string }>()
</script>

<style scoped>
.tag { display:inline-block; padding:2px 8px; border-radius:4px; font-size:12px; line-height:18px; }
.tone-success { background:#ECFDF5; color:#059669; }
.tone-warning { background:#FFFBEB; color:#B45309; }
.tone-danger { background:#FEF2F2; color:#DC2626; }
.tone-info { background:#F0F9FF; color:#0284C7; }
.tone-brand { background:#EFF6FF; color:#2563EB; }
.tone-neutral { background:#F1F5F9; color:#475569; }
</style>
