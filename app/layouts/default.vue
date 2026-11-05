<template>
  <div>
    <header class="site-header"><div class="site-width header-inner">
      <nuxt-link class="brand" to="/">怎样博客<span>HOW BLOG</span></nuxt-link>
      <nuxt-link class="nav-link" to="/">文章</nuxt-link>
      <span class="header-note">记录思考，分享技术</span>
    </div></header>
    <main class="site-width"><slot /></main>
    <footer class="site-width site-footer">怎样博客 · 把想法写下来</footer>
  </div>
</template>
