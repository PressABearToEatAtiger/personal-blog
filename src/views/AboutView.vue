<script setup lang="ts">
import { Code2, BookOpen, Coffee, ArrowRight } from 'lucide-vue-next'
import { site } from '../config'
import { assetUrl } from '../lib/assets'
</script>

<template>
  <header class="inner-page-heading"><p class="eyebrow">A FEW WORDS ABOUT ME</p><h1>关于我<span>。</span></h1><p>代码之外，也有很多值得记录的事。</p></header>
  <div class="about-layout"><img :src="assetUrl('/images/workspace.jpg')" alt="明亮安静的书桌与工作空间" class="about-photo" width="700" height="900" /><div class="about-copy"><span class="about-greeting">HELLO, WORLD.</span><h2>你好，我是{{ site.author }}。</h2><p>{{ site.bio }}</p><p>白天与代码打交道，闲下来就读书、散步，或者随手写点东西。我相信，把一个问题想清楚，再用简单的方式表达出来，是一件很有成就感的事。</p><h3>为什么写这个博客</h3><p>记忆会模糊，文字会留下来。这里存放我在开发中踩过的坑、读书时产生的念头，以及生活里那些不想匆匆错过的时刻。</p><p>不追求每次都有标准答案，只希望每次记录都比上次多一点理解。</p><div class="about-interests"><span><Code2 :size="17" />前端开发</span><span><BookOpen :size="17" />阅读</span><span><Coffee :size="17" />日常</span></div><h3>常用的工具</h3><p>Vue 3 / TypeScript / Element Plus / VS Code / Markdown</p><RouterLink to="/" class="text-link">从一篇文章开始认识我<ArrowRight :size="16" /></RouterLink></div></div>
</template>
