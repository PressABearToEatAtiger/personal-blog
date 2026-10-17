---
title: 让 CSS 布局回归简单
date: 2026-10-08
category: 前端开发
tags: [CSS, 工程实践]
excerpt: 用 Grid 和 Flex 解决真正的布局问题，少一点魔法数字，多一点稳定的约束。
cover: /images/architecture.jpg
---
一个布局最难维护的部分，常常不是用了哪种技术，而是里面藏了多少没有解释的数字。

## 先确认空间属于谁

页面容器决定最大宽度，网格决定栏目比例，组件决定自己的内部间距。让每一层只管理自己的空间，样式就不容易互相覆盖。

```css
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 48px;
  max-width: 1200px;
  margin-inline: auto;
}

@media (max-width: 800px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
}
```

## 理解 minmax 的作用

`minmax(0, 1fr)` 允许主栏缩到内容最小宽度以下。长代码或长链接不应该把整个页面撑开，而应该在自己的容器里滚动或换行。

## 稳定图片和文字的尺寸

给图片指定 `aspect-ratio` 可以在加载前预留空间。按钮和工具栏也需要稳定的高度，避免交互状态切换时页面跳动。

不要只在自己的屏幕上检查布局。试试最窄的手机、长一点的标题，以及系统放大后的文字，问题往往就会浮现。
