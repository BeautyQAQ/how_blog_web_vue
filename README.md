# 怎样博客前台

当前使用 Nuxt 4.6.4、Vue 3.5.44、Vue Router 5.4.0、TypeScript 6.0.3、Nitro 和 Vite，页面采用 Composition API 与服务端渲染。已移除 Nuxt 1、Axios 0.x、Vue 2 和 Webpack 3 的运行依赖。

## 本地运行

使用 Node.js 24（至少 24.15，已在 24.21.0 验证）：

```powershell
npm ci
npm run dev
```

前台 http://127.0.0.1:3000。Nitro 将同源的 `/api/` 转发到网关，默认 http://127.0.0.1:9005。更换网关时设置 `$env:NUXT_API_TARGET='http://目标地址:9005'`，开发和生产服务均支持，不向客户端暴露中间件凭据。

```powershell
npm run typecheck
npm run build
npm start
```

生产部署使用 `.output/` 和 Node 服务。默认不缓存公开文章响应，隐藏/删除的文章不会继续由页面缓存提供。正文使用后端统一渲染和清洗的 `contentHtml`，支持 Markdown，历史纯文本保留字面语法与换行。

## 当前页面

- 首页：真实公开文章、摘要/封面、分页、频道、标题/正文关键词查询、置顶、加载失败重试和空状态。公开列表 DTO 不携带完整正文。
- `/article/:id`：Markdown 标题/列表/代码/表格/图片、封面、摘要和 SEO 标题/摘要；待审核、隐藏或不存在的文章返回 404。
- 页面交互、链接导航和服务端渲染共用同源 API。

上传图片走同源 `/api/article/media/...`，由 Nitro 原样代理图片二进制和响应头；目前图片为独立公开资源，隐藏文章不撤回图片缓存。后端迁移、渲染和存储说明见后端 `doc/article-content.md`。

开发数据库已保留12篇公开文章，可测试首页分页、频道筛选与详情，其中「Markdown写作：从草稿到发布」展示本轮能力。另有待审核和未公开文章供管理端测试，详见后端 `doc/project-progress.md`。

Nuxt 4 的生效源码位于 `app/`，服务端代理位于 `server/`。旧页面、接口包装和 Nuxt 1 配置保存在 `legacy/`，旧图片/第三方模板素材仍保留在根目录 `assets/` 和 `static/`，都不进入当前构建。旧问答、吐槽、交友等静态样例尚未迁移为实际业务页面；活动/招聘原后端已移除，本轮没有重新启用。

`.npmrc` 使用 `legacy-peer-deps=true`，避免 npm 为 Nitro 的多种可选存储驱动解析和安装无关框架；构建需要的 Nuxt builder 和 acorn 已显式固定在依赖及锁文件中。TypeScript 7 的编译器接口暂不兼容现用 vue-tsc，使用已验证的 6.0.3。
