<script setup lang="ts">
import { Code2, Coffee, BookOpen, ArrowUpRight, Hash } from 'lucide-vue-next'
import { categories, tags, posts } from '../lib/posts'
const descriptions = ['在实践中理解技术，把问题拆开，把代码写清楚。', '走出去，也慢下来。收藏日子里细碎而明亮的片刻。', '读过的书，留下的句子，和仍在继续的思考。']
</script>

<template>
  <header class="inner-page-heading"><p class="eyebrow">EXPLORE BY TOPIC</p><h1>分类与标签<span>。</span></h1><p>让兴趣带路，找到想读的那一篇。</p></header>
  <section class="taxonomy-grid" aria-label="文章分类"><RouterLink v-for="(category, index) in categories" :key="category" :to="{ path: '/', query: { category } }" class="taxonomy-card"><span :class="['taxonomy-icon', `tone-${index}`]"><component :is="[Code2, Coffee, BookOpen][index % 3]" :size="28" :stroke-width="1.5" /></span><h2>{{ category }}</h2><p>{{ descriptions[index] }}</p><div><span>{{ posts.filter(p => p.category === category).length }} 篇文章</span><ArrowUpRight :size="22" /></div></RouterLink></section>
  <section class="all-tags"><h2><Hash :size="21" />所有标签</h2><div class="large-tag-cloud"><RouterLink v-for="tag in tags" :key="tag" :to="{ path: '/', query: { tag } }"><span># {{ tag }}</span><small>{{ posts.filter(p => p.tags.includes(tag)).length }}</small></RouterLink></div></section>
</template>
