<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElDialog, ElInput, ElEmpty, ElButton } from 'element-plus'
import { Search, ArrowUpRight } from 'lucide-vue-next'
import { filterPosts, posts } from '../lib/posts'

const open = defineModel<boolean>({ required: true })
const query = ref('')
const input = ref<InstanceType<typeof ElInput>>()
const results = computed(() => filterPosts(posts, '', '', query.value))
</script>

<template>
  <ElDialog v-model="open" title="搜索文章" class="search-dialog" width="640px" :append-to-body="true" @opened="input?.focus()" @closed="query = ''">
    <ElInput ref="input" v-model="query" placeholder="搜索标题、标签或正文…" aria-label="搜索关键词" clearable size="large"><template #prefix><Search :size="18" /></template></ElInput>
    <p class="search-count" aria-live="polite">{{ query.trim() ? `找到 ${results.length} 篇文章` : '全部文章' }}</p>
    <div class="search-results"><RouterLink v-for="post in results" :key="post.slug" :to="`/posts/${post.slug}`" class="search-result" @click="open = false"><div><small>{{ post.category }} · {{ post.date }}</small><strong>{{ post.title }}</strong><p>{{ post.excerpt }}</p></div><ArrowUpRight :size="19" /></RouterLink></div>
    <ElEmpty v-if="!results.length" description="没有找到相关文章"><ElButton @click="query = ''">清空搜索</ElButton></ElEmpty>
  </ElDialog>
</template>
