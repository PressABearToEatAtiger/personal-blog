---
title: TypeScript：让类型替你多想一步
date: 2026-09-26
category: 前端开发
tags: [TypeScript, 工程实践]
excerpt: 用可辨识联合表达状态，让不可能发生的组合，在写代码时就被发现。
cover: /images/workspace.jpg
---
当一个页面同时拥有 `loading`、`error` 和 `data` 三个变量时，究竟有多少种状态组合？其中又有多少种是我们真正想展示的？

## 用状态描述业务

与其让多个布尔值自由组合，不如直接把合法状态列出来。

```typescript
type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }
```

这样，当状态是 `success` 时，数据一定存在。当状态是 `error` 时，我们也一定有可以展示给用户的信息。

## 在边界上做检查

TypeScript 的类型在运行时不会保留。读取外部 JSON、本地存储或者用户输入时，仍然需要验证数据。

类型负责让程序内部的关系清楚，运行时校验负责确认外部世界有没有遵守约定。两者相互补充。

## 从小范围开始

不必一次改写整个项目。先找一个经常出错的状态，或者一个参数容易混淆的函数，把约束表达清楚，就已经有价值。
