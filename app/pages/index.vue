<template>
  <div class="home">
    <section class="intro"><p class="eyebrow">想法 · 实践 · 记录</p><h1>每一次思考，都值得留下。</h1><p class="muted">在这里，阅读关于技术与日常的新发现。</p></section>
    <section class="panel">
      <form class="filters" @submit.prevent="search">
        <input v-model="keyword" aria-label="搜索文章" placeholder="搜索标题或正文" />
        <button type="submit">搜索</button>
        <button v-if="query.keyword || query.channelid" type="button" @click="reset">查看全部</button>
      </form>
      <nav v-if="channels.length" class="channels" aria-label="文章频道">
        <nuxt-link :to="{ path: '/', query: channelQuery('') }" :class="{ selected: !query.channelid }">全部</nuxt-link>
        <nuxt-link v-for="channel in channels" :key="channel.id" :to="{ path: '/', query: channelQuery(channel.id) }" :class="{ selected: query.channelid === channel.id }">{{ channel.name }}</nuxt-link>
      </nav>
      <p v-if="loadError" role="alert">{{ loadError }} <button @click="refresh()">重试</button></p>
      <template v-else>
        <p class="muted">{{ query.keyword ? '搜索结果' : '最新文章' }} · 共 {{ total }} 篇</p>
        <p v-if="!articles.length" class="empty">这里还没有文章。{{ query.keyword || query.channelid ? '换个关键词或频道试试。' : '新的记录正在路上。' }}</p>
        <article v-for="article in articles" :key="article.id" class="article-card">
          <span v-if="article.istop === '1'" class="pinned">置顶</span>
          <h2><nuxt-link :to="'/article/' + article.id">{{ article.title }}</nuxt-link></h2>
          <p class="excerpt">{{ excerpt(article.content) }}</p>
          <p class="muted">{{ article.updatetime || article.createtime }} <span v-if="channelName(article.channelid)"> · {{ channelName(article.channelid) }}</span></p>
        </article>
        <nav v-if="total > size" class="pagination" aria-label="分页">
          <nuxt-link v-if="page > 1" :to="{ path: '/', query: pageQuery(page - 1) }">上一页</nuxt-link>
          <span>{{ page }} / {{ Math.ceil(total / size) }}</span>
          <nuxt-link v-if="page * size < total" :to="{ path: '/', query: pageQuery(page + 1) }">下一页</nuxt-link>
        </nav>
      </template>
    </section>
  </div>
</template>


<script setup lang="ts">
interface Article { id: string; title: string; content: string; istop: string; updatetime: string; createtime: string; channelid?: string }
interface Channel { id: string; name: string; state: string }
interface Result<T> { flag: boolean; message: string; data: T }
const route = useRoute()
const query = computed(() => route.query)
const page = computed(() => { const n = Number(route.query.page); return Number.isInteger(n) && n > 0 ? n : 1 })
const size = 10
const keyword = ref(String(route.query.keyword || ''))
watch(() => route.query.keyword, value => { keyword.value = String(value || '') })
const { data, error: loadFailure, refresh } = await useFetch<Result<{ rows: Article[]; total: number }>>('/api/article/article/public', {
  query: computed(() => ({ page: page.value, size, keyword: String(route.query.keyword || ''), channelid: String(route.query.channelid || '') }))
})
const { data: channelData } = await useFetch<Result<Channel[]>>('/api/article/channel')
const articles = computed(() => data.value?.data?.rows || [])
const total = computed(() => data.value?.data?.total || 0)
const channels = computed(() => (channelData.value?.data || []).filter(channel => channel.state === '1'))
const loadError = computed(() => loadFailure.value || data.value?.flag === false ? '文章暂时加载失败，请稍后重试。' : '')
useSeoMeta({ title: () => route.query.keyword ? route.query.keyword + ' · 怎样博客' : '怎样博客 · 文章', description: '记录思考，分享技术。阅读怎样博客的最新文章。' })
function search() { navigateTo({ path: '/', query: { ...route.query, keyword: keyword.value.trim(), page: '1' } }) }
function reset() { navigateTo('/') }
function channelQuery(id: string) { return { keyword: String(route.query.keyword || ''), channelid: id } }
function pageQuery(value: number) { return { ...route.query, page: String(value) } }
function channelName(id?: string) { return channels.value.find(item => item.id === id)?.name || '' }
function excerpt(content: string) { return (content || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').slice(0, 160) }
</script>

<style scoped>
.home { padding-top: 42px; }
.intro { padding: 0 4px 28px; }
.eyebrow { color: #466ba7; letter-spacing: 3px; font-size: 13px; }
h1 { font-size: 32px; line-height: 1.4; }
.filters, .channels, .pagination { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
.filters input { flex: 1; min-width: 150px; }
.channels { margin-top: 24px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0; }
.channels a { color: #718096; }
.channels .selected { color: #234fbd; font-weight: 700; }
.article-card { padding: 22px 0; border-bottom: 1px solid #edf0f4; }
h2 { margin: 5px 0 10px; font-size: 21px; }
h2 a { color: #203149; }
.excerpt { color: #536176; overflow-wrap: anywhere; }
.pinned { color: #466ba7; font-size: 12px; }
.empty { text-align: center; padding: 64px 10px; color: #718096; }
.pagination { justify-content: center; padding-top: 28px; }
</style>
