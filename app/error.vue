<template><NuxtLayout><section class="panel" style="margin-top:40px"><h1>{{ error?.statusCode === 404 ? '文章不存在或尚未发布' : '页面暂时无法加载' }}</h1><p class="muted">{{ error?.message }}</p><NuxtLink to="/" @click.prevent="clearError({ redirect: '/' })">返回首页</NuxtLink></section></NuxtLayout></template>
<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error?: NuxtError }>()
</script>
