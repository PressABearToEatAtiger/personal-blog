---
title: 重新认识 Vue 3 的响应式
date: 2026-09-10
category: 前端开发
tags: [Vue 3, JavaScript]
excerpt: 从 ref 和 computed 出发，理解依赖是怎样被收集，又怎样驱动界面更新的。
cover: /images/architecture.jpg
---
响应式系统让我们可以专注于描述数据，而不是手动同步每一处界面。

## ref 保存一个值

使用 `ref` 声明状态，在 JavaScript 中通过 `.value` 访问，在模板中则会自动解包。

```javascript
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
count.value += 1
console.log(doubled.value) // 2
```

## computed 表达派生关系

如果一个值可以从已有状态计算出来，通常不用再维护一份独立状态。`computed` 清楚地表达了这种关系，也避免了两份状态忘记同步的问题。

## 留意解构与引用

直接解构 `reactive` 对象中的基础类型属性，会取出当时的值。需要保留关联时，可以通过 getter 访问，或使用 `toRefs`。

理解这些边界，比记住很多响应式技巧更有帮助。
