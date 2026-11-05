import request from '@/utils/request'
export default {
  list(params) { return request.get('/article/article/public', { params }) },
  detail(id) { return request.get('/article/article/public/' + encodeURIComponent(id)) },
  channels() { return request.get('/article/channel') }
}
