<script setup lang="ts">
import { ArrowUpRight, Code2, Coffee, BookOpen, UserRound } from 'lucide-vue-next'
import { posts, categories, tags } from '../lib/posts'
import { site } from '../config'
</script>

<template>
  <aside class="blog-sidebar" aria-label="博客信息">
    <section class="author-section"><div class="author-avatar"><UserRound :size="32" :stroke-width="1.3" /></div><h2>嗨，很高兴遇见你。</h2><p>{{ site.bio }}</p><RouterLink to="/about" class="text-link">多了解一点<ArrowUpRight :size="15" /></RouterLink><div class="author-stats"><div><strong>{{ posts.length }}</strong><span>篇文章</span></div><div><strong>{{ categories.length }}</strong><span>个分类</span></div><div><strong>{{ tags.length }}</strong><span>个标签</span></div></div></section>
    <section class="sidebar-section"><h2>文章分类<span>CATEGORIES</span></h2><RouterLink v-for="(category, index) in categories" :key="category" :to="{ path: '/', query: { category } }" class="sidebar-category"><span><component :is="[Code2, Coffee, BookOpen][index % 3]" :size="16" />{{ category }}</span><small>{{ posts.filter(p => p.category === category).length }}</small></RouterLink></section>
    <section class="sidebar-section"><h2>随手标签<span>TAGS</span></h2><div class="tag-cloud"><RouterLink v-for="tag in tags" :key="tag" :to="{ path: '/', query: { tag } }"># {{ tag }}</RouterLink></div></section>
    <div class="sidebar-note"><span class="status-dot"></span>慢慢写，慢慢积累。<p>保持好奇，下一篇见。</p></div>
  </aside>
</template>
