<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElButton, ElMessage, ElTooltip } from 'element-plus'
import { ArrowLeft, ArrowRight, Clock3, Link2, List } from 'lucide-vue-next'
import { posts, formatDate } from '../lib/posts'
import NotFoundView from './NotFoundView.vue'
import { site } from '../config'

const route = useRoute()
const post = computed(() => posts.find(p => p.slug === route.params.slug))
const index = computed(() => posts.findIndex(p => p.slug === route.params.slug))
const previous = computed(() => posts[index.value + 1])
const next = computed(() => posts[index.value - 1])
const progress = ref(0)
const activeHeading = ref('')
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight
  progress.value = distance > 0 ? Math.min(100, window.scrollY / distance * 100) : 0
  const headings = [...document.querySelectorAll<HTMLElement>('.markdown-body h1, .markdown-body h2, .markdown-body h3')]
  activeHeading.value = headings.filter(h => h.getBoundingClientRect().top <= 160).at(-1)?.id || headings[0]?.id || ''
}
async function copyLink() {
  try { await navigator.clipboard.writeText(location.href); ElMessage.success('文章链接已复制') }
  catch { ElMessage.info('复制未完成，请从浏览器地址栏复制链接') }
}
function jump(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); activeHeading.value = id }
watch(post, value => { document.title = `${value?.title || '文章未找到'} · ${site.name}`; progress.value = 0 }, { immediate: true })
onMounted(() => { window.addEventListener('scroll', updateProgress, { passive: true }); updateProgress() })
onUnmounted(() => window.removeEventListener('scroll', updateProgress))
</script>

<template>
  <template v-if="post"><div class="reading-progress" :style="{ width: `${progress}%` }"></div><RouterLink to="/" class="back-link"><ArrowLeft :size="16" />所有文章</RouterLink><header class="article-header"><div class="post-meta"><RouterLink :to="{ path: '/', query: { category: post.category } }" class="category-label">{{ post.category }}</RouterLink><span>·</span><time :datetime="post.date">{{ formatDate(post.date) }}</time></div><h1>{{ post.title }}</h1><p>{{ post.excerpt }}</p><div class="article-byline"><span class="byline-avatar">拾</span><span>{{ site.author }}</span><span class="reading-time"><Clock3 :size="14" />{{ post.minutes }} 分钟阅读</span><ElTooltip content="复制文章链接"><ElButton text class="icon-button" aria-label="复制文章链接" @click="copyLink"><Link2 :size="18" /></ElButton></ElTooltip></div></header><img :src="post.cover" :alt="post.title" class="article-cover" width="1400" height="700" />
  <div class="article-layout"><div><article class="markdown-body" v-html="post.html"></article><div class="article-tags"><RouterLink v-for="tag in post.tags" :key="tag" :to="{ path: '/', query: { tag } }"># {{ tag }}</RouterLink></div><div class="article-end">感谢读到这里。<span>愿你今天也有所收获。</span></div><nav class="adjacent-posts" aria-label="相邻文章"><RouterLink v-if="previous" :to="`/posts/${previous.slug}`"><small><ArrowLeft :size="14" />上一篇</small><strong>{{ previous.title }}</strong></RouterLink><RouterLink v-if="next" :to="`/posts/${next.slug}`"><small>下一篇<ArrowRight :size="14" /></small><strong>{{ next.title }}</strong></RouterLink></nav></div><aside class="article-toc"><h2><List :size="17" />文章目录</h2><nav aria-label="文章目录"><a v-for="heading in post.toc" :key="heading.id" :href="`#${heading.id}`" :class="{ active: activeHeading === heading.id, nested: heading.level > 2 }" @click.prevent="jump(heading.id)">{{ heading.text }}</a></nav><div class="toc-progress">已读 {{ Math.round(progress) }}%</div></aside></div></template>
  <NotFoundView v-else />
</template>
