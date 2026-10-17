<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import { posts, type Post } from '../lib/posts'
const groups = computed(() => {
  const collection = new Map<string, Post[]>()
  for (const post of posts) { const month = post.date.slice(0, 7); collection.set(month, [...(collection.get(month) || []), post]) }
  return [...collection.entries()]
})
</script>

<template>
  <header class="inner-page-heading"><p class="eyebrow">A LITTLE COLLECTION OF TIME</p><h1>文章归档<span>。</span></h1><p>共 {{ posts.length }} 篇记录，每一篇都是时间的切片。</p></header>
  <div class="archive-list"><section v-for="[month, articles] in groups" :key="month" class="archive-month"><h2>{{ month.slice(0, 4) }}<span>{{ Number(month.slice(5)) }} 月</span><small>{{ articles.length }} 篇</small></h2><RouterLink v-for="post in articles" :key="post.slug" :to="`/posts/${post.slug}`" class="archive-item"><time :datetime="post.date">{{ post.date.slice(5).replace('-', ' / ') }}</time><div><h3>{{ post.title }}</h3><span>{{ post.category }}</span></div><ArrowUpRight :size="19" /></RouterLink></section></div>
</template>
