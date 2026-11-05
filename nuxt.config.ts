export default defineNuxtConfig({
  compatibilityDate: '2026-11-05',
  srcDir: 'app',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: { apiTarget: 'http://127.0.0.1:9005' },
  app: { head: { htmlAttrs: { lang: 'zh-CN' }, title: '怎样博客', meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }] } },
  typescript: { strict: true }
})
