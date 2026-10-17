import { createRouter, createWebHashHistory } from 'vue-router'
import { site } from './config'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue'), meta: { title: '首页' } },
    { path: '/categories', component: () => import('./views/CategoriesView.vue'), meta: { title: '分类与标签' } },
    { path: '/archives', component: () => import('./views/ArchivesView.vue'), meta: { title: '文章归档' } },
    { path: '/about', component: () => import('./views/AboutView.vue'), meta: { title: '关于我' } },
    { path: '/posts/:slug', component: () => import('./views/PostView.vue'), meta: { title: '文章' } },
    { path: '/:pathMatch(.*)*', component: () => import('./views/NotFoundView.vue'), meta: { title: '页面未找到' } },
  ],
  scrollBehavior(_to, _from, saved) { return saved || { top: 0 } },
})
router.afterEach(to => { document.title = `${to.meta.title} · ${site.name}` })
