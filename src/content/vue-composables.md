---
title: 在 Vue 3 中，把逻辑写得更从容
date: 2026-10-15
category: 前端开发
tags: [Vue 3, TypeScript, 工程实践]
excerpt: 从一个小小的 composable 开始，让状态、逻辑和组件各归其位。聊聊我在日常项目里整理代码的方式。
cover: /images/workspace.jpg
featured: true
---
写组件的时候，我们经常会遇到这样的时刻：页面没有变复杂，文件却越来越长。表单、搜索、加载状态和监听器挤在一起，修改一个细节，需要上下翻动好几次。

我开始习惯先问一个问题：**这段逻辑到底负责什么？** 答案清晰时，拆分通常也就顺理成章。

## 从具体问题开始

以文章搜索为例，我们需要一个关键词、一组结果，以及一个清空操作。把这件事放进 composable，比单纯按代码长度拆文件更有意义。

```typescript
import { computed, ref } from 'vue'

export function useSearch<T>(items: T[], textOf: (item: T) => string) {
  const keyword = ref('')
  const results = computed(() => {
    const query = keyword.value.trim().toLowerCase()
    return items.filter(item => textOf(item).toLowerCase().includes(query))
  })
  return { keyword, results, clear: () => { keyword.value = '' } }
}
```

这里的响应式状态没有离开 Vue 的语境。组件仍然可以通过 `v-model` 绑定关键词，通过 `computed` 获得筛选结果。

## 给边界起一个好名字

`useSearch` 比 `usePageLogic` 更容易理解，因为它直接描述职责。一个好的名字，也会提醒我们不要把分页、弹窗和网络请求都顺手塞进去。

> 抽象的价值，是让下一次阅读更轻松。能不能复用，是随后发生的事情。

## 保持输入与输出简单

我倾向于返回普通对象，让每一个状态和操作都能被独立取出。对外暴露必要的状态，内部辅助函数则留在函数里。

如果输入本身需要响应式更新，可以用 `toValue` 接受 ref 或 getter，并在计算属性中读取。选择什么形式，应该由调用方的真实需要决定。

## 什么时候不必拆分

只有几行、只在一个组件里出现、含义也足够明确的逻辑，留在组件里往往更好。文件数量不等于架构质量。

我现在的习惯是：先把事情写清楚，再观察哪些概念值得独立存在。代码会慢慢长出它自己的结构。
