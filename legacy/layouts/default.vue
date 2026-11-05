<template>
  <div>
    <header class="site-header"><div class="site-width header-inner">
      <nuxt-link class="brand" to="/">怎样博客<span>HOW BLOG</span></nuxt-link>
      <nuxt-link class="nav-link" to="/">文章</nuxt-link>
      <span class="header-note">记录思考，分享技术</span>
    </div></header>
    <main class="site-width"><nuxt /></main>
    <footer class="site-width site-footer">怎样博客 · 把想法写下来</footer>
  </div>
</template>

<style>
* { box-sizing: border-box; }
body { margin: 0; color: #203149; background: #f5f7fa; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif; line-height: 1.7; }
a { color: #234fbd; text-decoration: none; }
a:hover { text-decoration: underline; }
button, input { font: inherit; }
button { cursor: pointer; border: 1px solid #cbd5e1; background: white; border-radius: 6px; padding: 7px 16px; color: #203149; }
button:disabled { cursor: default; opacity: .45; }
input { border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; max-width: 100%; }
.site-width { width: min(1080px, calc(100% - 40px)); margin: 0 auto; }
.site-header { background: white; border-bottom: 1px solid #e2e8f0; }
.header-inner { min-height: 88px; display: flex; align-items: center; gap: 42px; }
.brand { font-size: 23px; font-weight: 700; color: #203149; }
.brand span { display: block; font-size: 10px; letter-spacing: 3px; line-height: 1.2; color: #718096; }
.nav-link { font-weight: 600; }
.header-note { margin-left: auto; color: #718096; font-size: 14px; }
.site-footer { padding: 36px 0; color: #718096; font-size: 13px; }
.panel { background: white; padding: 28px; border: 1px solid #e2e8f0; border-radius: 10px; }
.muted { color: #718096; font-size: 14px; }
@media(max-width: 600px) { .header-note { display: none; } .site-width { width: calc(100% - 28px); } .panel { padding: 20px; } }
</style>
