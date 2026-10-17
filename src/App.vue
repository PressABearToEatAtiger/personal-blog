<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElButton, ElTooltip, ElBacktop, ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { BookOpen, Search, Sun, Moon, Menu, X, ArrowUp, ArrowUpRight } from 'lucide-vue-next'
import { site } from './config'
import { dark, toggleTheme } from './lib/theme'
import SearchDialog from './components/SearchDialog.vue'

const route = useRoute()
const searchOpen = ref(false)
const menuOpen = ref(false)
const links = [{ to: '/', label: '首页' }, { to: '/categories', label: '分类' }, { to: '/archives', label: '归档' }, { to: '/about', label: '关于我' }]
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <a class="skip-link" href="#main-content">跳至正文</a>
    <header class="site-header">
      <div class="header-inner">
        <RouterLink to="/" class="brand" aria-label="拾光笔记首页">
          <span class="brand-mark"><BookOpen :size="22" :stroke-width="1.8" /></span>
          <span>{{ site.name }}<small>{{ site.englishName }}</small></span>
        </RouterLink>
        <nav class="desktop-nav" aria-label="主导航">
          <RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
        </nav>
        <div class="header-tools">
          <ElTooltip content="搜索文章" placement="bottom"><ElButton class="icon-button" text aria-label="搜索文章" @click="searchOpen = true"><Search :size="19" /></ElButton></ElTooltip>
          <span class="tool-separator"></span>
          <ElTooltip :content="dark ? '切换浅色主题' : '切换深色主题'" placement="bottom"><ElButton class="icon-button" text :aria-label="dark ? '切换浅色主题' : '切换深色主题'" @click="toggleTheme"><Sun v-if="dark" :size="19" /><Moon v-else :size="19" /></ElButton></ElTooltip>
          <ElButton class="icon-button menu-button" text :aria-label="menuOpen ? '关闭菜单' : '打开菜单'" :aria-expanded="menuOpen" aria-controls="mobile-nav" @click="menuOpen = !menuOpen"><X v-if="menuOpen" :size="21" /><Menu v-else :size="21" /></ElButton>
        </div>
      </div>
      <nav v-if="menuOpen" id="mobile-nav" class="mobile-nav" aria-label="手机导航"><RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}<ArrowUpRight :size="16" /></RouterLink></nav>
    </header>
    <main id="main-content" class="page-shell" tabindex="-1"><RouterView /></main>
    <footer class="site-footer"><div class="footer-inner"><RouterLink to="/" class="footer-brand"><BookOpen :size="18" />{{ site.name }}</RouterLink><span>把平凡的日子，写成自己的故事。</span><small>© {{ new Date().getFullYear() }} {{ site.name }}</small></div></footer>
    <SearchDialog v-model="searchOpen" />
    <ElBacktop :right="24" :bottom="28" aria-label="返回顶部"><ArrowUp :size="19" /></ElBacktop>
  </ElConfigProvider>
</template>
