<template>
  <div class="detail">
    <NuxtLink to="/">← 返回文章列表</NuxtLink>
    <article class="panel">
      <p class="muted">{{ article.createtime }}<span v-if="article.updatetime !== article.createtime"> · 更新于 {{ article.updatetime }}</span></p>
      <h1>{{ article.title }}</h1>
      <p v-if="article.summary" class="detail-summary">{{ article.summary }}</p>
      <ArticleCover :src="article.image" :alt="article.title + '封面'" class="detail-cover" />
      <!-- HTML is rendered and sanitized by the article service; raw Markdown is never inserted. -->
      <div class="article-body markdown-content" v-html="article.contentHtml" />
    </article>
  </div>
</template>
<script setup lang="ts">
interface Article { id: string; title: string; contentHtml: string; summary: string; image?: string; createtime: string; updatetime: string }
const route = useRoute()
const { data, error } = await useFetch<{ flag: boolean; data: Article }>(() => '/api/article/article/public/' + encodeURIComponent(String(route.params.id)))
if (error.value || !data.value?.flag) throw createError({ statusCode: error.value?.statusCode === 404 ? 404 : 503, statusMessage: error.value?.statusCode === 404 ? 'Article not found' : 'Article temporarily unavailable', message: error.value?.statusCode === 404 ? '文章不存在或尚未发布' : '文章暂时加载失败，请稍后重试' })
const article = computed(() => data.value!.data)
useSeoMeta({ title: () => article.value.title + ' · 怎样博客', description: () => article.value.summary, ogTitle: () => article.value.title, ogDescription: () => article.value.summary })
</script>
<style scoped>
.detail { padding-top: 36px; }
.panel { margin-top: 24px; min-height: 360px; }
h1 { font-size: 32px; line-height: 1.5; overflow-wrap: anywhere; }
.article-body { margin-top: 32px; font-size: 17px; line-height: 1.9; }
.detail-summary { color: #607086; padding-left: 18px; border-left: 3px solid #b7c8e1; line-height: 1.9; margin-top: 24px; }
.detail-cover { display: block; width: 100%; max-height: 380px; object-fit: cover; border-radius: 10px; margin: 28px 0; }
</style>
