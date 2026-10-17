<script setup lang="ts">
import { ArrowUpRight, Clock3 } from 'lucide-vue-next'
import { formatDate, type Post } from '../lib/posts'
defineProps<{ post: Post }>()
</script>

<template>
  <article class="post-card">
    <RouterLink :to="`/posts/${post.slug}`" class="post-image-link" tabindex="-1" aria-hidden="true"><img :src="post.cover" :alt="post.title" loading="lazy" width="480" height="340" /></RouterLink>
    <div class="post-card-body">
      <div class="post-meta"><RouterLink :to="{ path: '/', query: { category: post.category } }" class="category-label">{{ post.category }}</RouterLink><span class="meta-dot">·</span><time :datetime="post.date">{{ formatDate(post.date) }}</time></div>
      <h3><RouterLink :to="`/posts/${post.slug}`">{{ post.title }}</RouterLink></h3>
      <p>{{ post.excerpt }}</p>
      <div class="card-bottom"><span class="reading-time"><Clock3 :size="13" />{{ post.minutes }} 分钟阅读</span><RouterLink :to="`/posts/${post.slug}`" class="read-link" :aria-label="`阅读：${post.title}`"><ArrowUpRight :size="19" /></RouterLink></div>
    </div>
  </article>
</template>
