const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = createProxyMiddleware({
  target: process.env.API_TARGET || 'http://127.0.0.1:9005',
  changeOrigin: true,
  pathRewrite: { '^/api': '' }
})
