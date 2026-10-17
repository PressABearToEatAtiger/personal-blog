<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElButton, ElEmpty, ElPagination } from 'element-plus'
import { ArrowUpRight, ArrowRight, Pin, Clock3, X } from 'lucide-vue-next'
import { categories, filterPosts, formatDate, posts } from '../lib/posts'
import { site } from '../config'
import BlogSidebar from '../components/BlogSidebar.vue'
import PostCard from '../components/PostCard.vue'

const route = useRoute()
const router = useRouter()
const category = computed(() => typeof route.query.category === 'string' ? route.query.category : '')
const tag = computed(() => typeof route.query.tag === 'string' ? route.query.tag : '')
const filtered = computed(() => filterPosts(posts, category.value, tag.value))
const pageSize = 4
const page = computed(() => Math.min(Math.max(1, Math.floor(Number(route.query.page)) || 1), Math.max(1, Math.ceil(filtered.value.length / pageSize))))
const visible = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))
const featured = posts.find(p => p.featured)!
const showFeature = computed(() => !category.value && !tag.value && page.value === 1)
function selectCategory(value: string) { router.push({ path: '/', query: { ...(value ? { category: value } : {}), ...(tag.value ? { tag: tag.value } : {}) } }) }
function changePage(value: number) { router.push({ query: { ...route.query, page: value } }) }
</script>

<template>
  <section class="home-intro"><div><p class="eyebrow"><span class="status-dot"></span>记录，让日常有迹可循</p><h1>{{ site.name }}<span>。</span></h1><p class="intro-description">{{ site.description }}</p></div><div class="intro-aside"><span>THINK. BUILD. LIVE.</span><p>在文字里整理思绪，<br />在日常里发现新的可能。</p><span class="little-line"></span></div></section>
  <section v-if="showFeature" class="featured-section" aria-label="精选文章">
    <RouterLink :to="`/posts/${featured.slug}`" class="featured-story"><div class="featured-image"><img :src="featured.cover" alt="阳光照进安静的工作空间" width="1400" height="920" fetchpriority="high" /><span class="image-badge"><Pin :size="12" />精选文章</span></div><div class="featured-copy"><div class="post-meta"><span class="category-label">{{ featured.category }}</span><span> / </span><time :datetime="featured.date">{{ formatDate(featured.date) }}</time></div><h2>{{ featured.title }}</h2><p>{{ featured.excerpt }}</p><div class="featured-bottom"><span class="reading-time"><Clock3 :size="14" />{{ featured.minutes }} 分钟阅读</span><span class="featured-read">读一读<ArrowRight :size="17" /></span></div></div></RouterLink>
  </section>
  <div class="content-layout"><section id="articles" class="article-feed"><div class="section-heading"><div><h2>最新文章<span>{{ String(filtered.length).padStart(2, '0') }}</span></h2><p>一些思考，一些实践，一些生活。</p></div><ArrowUpRight :size="22" :stroke-width="1.3" /></div><div class="filter-bar" role="group" aria-label="文章分类"><ElButton :class="{ selected: !category }" text :aria-pressed="!category" @click="selectCategory('')">全部文章</ElButton><ElButton v-for="item in categories" :key="item" text :class="{ selected: category === item }" :aria-pressed="category === item" @click="selectCategory(item)">{{ item }}</ElButton></div>
    <div v-if="tag" class="active-tag">标签：# {{ tag }}<ElButton text circle aria-label="清除标签筛选" @click="router.push({ query: category ? { category } : {} })"><X :size="14" /></ElButton></div>
    <div class="post-list"><PostCard v-for="post in visible" :key="post.slug" :post="post" /></div>
    <ElEmpty v-if="!visible.length" description="这个分类下还没有文章"><ElButton @click="router.push('/')">查看全部文章</ElButton></ElEmpty>
    <div v-if="filtered.length > pageSize" class="pagination-row"><span>共 {{ filtered.length }} 篇文章</span><ElPagination :current-page="page" :page-size="pageSize" :total="filtered.length" layout="prev, pager, next" @current-change="changePage" /></div>
  </section><BlogSidebar /></div>
</template>
