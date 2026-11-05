<template>
  <div class="detail">
    <nuxt-link to="/">← 返回文章列表</nuxt-link>
    <article class="panel">
      <p class="muted">{{ article.createtime }}<span v-if="article.updatetime !== article.createtime"> · 更新于 {{ article.updatetime }}</span></p>
      <h1>{{ article.title }}</h1>
      <div class="article-body">{{ article.content }}</div>
    </article>
  </div>
</template>
<script>
import articlesApi from '@/api/article'
export default {
  async asyncData({ params, error }) {
    try { return { article: (await articlesApi.detail(params.id)).data } } catch (err) {
      error({ statusCode: err.response && err.response.status === 404 ? 404 : 503, message: err.response && err.response.status === 404 ? '文章不存在或尚未发布' : '文章暂时加载失败，请稍后重试' })
    }
  },
  head() { return { title: this.article.title + ' · 怎样博客' } }
}
</script>
<style scoped>
.detail { padding-top: 36px; }
.panel { margin-top: 24px; min-height: 360px; }
h1 { font-size: 32px; line-height: 1.5; overflow-wrap: anywhere; }
.article-body { margin-top: 32px; white-space: pre-wrap; overflow-wrap: anywhere; font-size: 17px; line-height: 1.9; }
</style>
