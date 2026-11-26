<template>
  <text class="tag" :class="'tone-' + (tone || 'neutral')">{{ displayStatus }}</text>
</template>

<script setup lang="ts">
// 状态一律使用后端下发的 displayStatus 与 tone，前端不做状态文案映射
// v1.1 VIS-04：仅调整标签色板与尺寸，状态取值与映射逻辑保持不变

defineProps<{ displayStatus: string; tone?: string }>()
</script>

<style scoped>
/* VIS-04：底色饱和一档、文字同色深一级；圆角与高度统一；四类状态色相可区分
   文字对比度（WCAG）：可租 4.98:1、待审核 4.53:1、在租 5.88:1、已出租 6.75:1，均 ≥4.5:1 */
.tag { display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; height: 24px; padding: 0 10px; border-radius: 8px; font-size: 12px; line-height: 24px; font-weight: 500; flex: 0 0 auto; }
.tone-success { background: #E8F9EF; color: #057A3D; }
.tone-warning { background: #FFF1E6; color: #B4530F; }
.tone-info { background: #EAF0FF; color: #1B4ED8; }
.tone-neutral { background: #F1F2F5; color: #4B5563; }
.tone-brand { background: #E8F9EF; color: #057A3D; }
.tone-danger { background: #FDECEC; color: #B42318; }
</style>
