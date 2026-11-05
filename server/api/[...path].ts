export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)
  const url = getRequestURL(event)
  const path = url.pathname.replace(/^\/api\//, '/')
  return proxyRequest(event, config.apiTarget.replace(/\/$/, '') + path + url.search)
})
