import axios from 'axios'

const service = axios.create({
  baseURL: process.server ? process.env.API_TARGET : '/api',
  timeout: 15000
})
service.interceptors.response.use(response => {
  const result = response.data
  if (!result || !result.flag) return Promise.reject(new Error(result && result.message || '请求失败'))
  return result
})
export default service
