# 拾光笔记

Vue 3 + TypeScript + Element Plus 个人技术博客。本地 Markdown 管理内容，所有封面图片随项目保存，运行后不依赖外部图片或字体服务。

## 运行

需要 Node.js 22.18 或更高版本。建议将整个项目解压到 D:\Projects\personal-blog 或 E 盘的任意开发目录。

```powershell
cd D:\Projects\personal-blog
npm ci --cache .npm-cache
npm run dev
```

打开终端显示的本地地址，通常为 http://127.0.0.1:5173 。端口被占用时 Vite 自动选择下一个端口。

```powershell
npm test
npm run build
npm run preview
```

build 包含 TypeScript 检查，输出 dist 文件夹。preview 预览生产构建。源码包不包含 node_modules；npm ci 安装锁定版本。--cache .npm-cache 将安装缓存也保存在项目所在磁盘。

## 功能

- 首页：精选文章、分类筛选、标签筛选、分页。
- 文章：Markdown 渲染、代码高亮、桌面目录、阅读进度、复制链接和相邻文章。
- 分类和标签统计、按月归档、关于页面。
- 全文搜索、深浅主题持久化、移动端导航、返回顶部、404。
- 筛选保留在 URL，hash 路由可直接部署到静态服务器。

## 修改内容

作者、博客名称和简介：src/config.ts。关于页：src/views/AboutView.vue。主色和字体：src/style.css。

在 src/content 添加 Markdown 文件，文件名就是文章 slug。示例：

```markdown
---
title: 我的第一篇文章
date: 2026-10-16
category: 前端开发
tags: [Vue 3, TypeScript]
excerpt: 这是出现在列表中的文章简介。
cover: /images/workspace.jpg
featured: false
---

## 一个开始

在这里书写正文。
```

date 必须为有效 YYYY-MM-DD 日期；tags 是字符串数组；cover 使用 public/images 下的本地图片。featured: true 标记精选，首页展示最新的一篇精选。文章按日期倒序排列。修改文章会触发开发服务器更新，正式发布前需要重新 build。

## 项目结构

```text
src/
  components/    公共布局模块、文章卡片、搜索、侧栏
  content/       Markdown 示例文章
  lib/           内容解析与主题状态
  views/         首页、文章、分类、归档、关于和 404
  config.ts      站点与作者资料
  router.ts      hash 路由
  style.css      设计变量和响应式样式
public/images/   本地封面图
tests/           文章索引与安全渲染测试
docs/            设计说明
```

这是静态博客，搜索在本地完成，未包含登录、服务端评论或在线编辑后台。默认作者为“博主”，可以替换成自己的资料。

## 部署

### GitHub Pages

仓库地址：https://github.com/PressABearToEatAtiger/personal-blog

1. 将源码推送到 main 分支。
2. 在仓库 Settings → Pages 中，将 Source 设为 GitHub Actions。
3. 打开 Actions，等待 Deploy blog to GitHub Pages 完成。首次启用 Pages 后，如工作流已失败，可手动重新运行。

每次推送到 main 都会自动运行内容测试、类型检查、构建与发布。拉取请求只做验证，不发布。工作流通过 configure-pages 读取站点路径，图片和图标会随路径自动适配。

默认网站地址：https://pressabeartoeatatiger.github.io/personal-blog/ 。只有 GitHub Pages 部署成功后该地址才可访问。私有仓库能否启用 Pages 取决于账户套餐；不要为部署自动更改仓库可见性。

### 其他静态服务器

将 dist 里的文件上传到静态站点根目录，通过 HTTP(S) 提供访问，不要双击 index.html 运行。hash 路由无需配置页面重写。若部署在子目录，先在 vite.config.ts 设置对应 base，再运行 build。

封面来自 Unsplash，原始图片地址见 public/images/SOURCES.md。示例文章用于演示，可以自行替换。
