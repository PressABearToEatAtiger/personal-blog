import MarkdownIt from 'markdown-it'
import { parse } from 'yaml'
import { assetUrl } from './assets'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('json', json)

export interface Post {
  slug: string; title: string; date: string; category: string; tags: string[]
  excerpt: string; cover: string; body: string; html: string; minutes: number
  featured: boolean; toc: { id: string; text: string; level: number }[]
}

export function parsePost(slug: string, raw: string): Post {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw)
  if (!match) throw new Error(`文章 ${slug} 缺少 YAML 头信息`)
  const data = parse(match[1])
  for (const field of ['title', 'date', 'category', 'excerpt', 'cover']) {
    if (typeof data?.[field] !== 'string' || !data[field].trim()) throw new Error(`${slug}: ${field} 无效`)
  }
  const date = new Date(`${data.date}T00:00:00Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== data.date) throw new Error(`${slug}: 日期无效`)
  if (!Array.isArray(data.tags) || !data.tags.every((tag: unknown) => typeof tag === 'string')) throw new Error(`${slug}: 标签无效`)
  if (!/^\/images\/[\w.-]+$/.test(data.cover)) throw new Error(`${slug}: 封面必须位于 public/images`)
  const toc: Post['toc'] = []
  const md = new MarkdownIt({ html: false, linkify: true, typographer: true,
    highlight(code, language) {
      return language && hljs.getLanguage(language) ? hljs.highlight(code, { language }).value : ''
    },
  })
  md.renderer.rules.heading_open = (tokens, index, options, _env, renderer) => {
    const id = `section-${toc.length}`
    const heading = tokens[index]
    heading.attrSet('id', id)
    toc.push({ id, text: tokens[index + 1].content, level: Number(heading.tag.slice(1)) })
    return renderer.renderToken(tokens, index, options)
  }
  const body = match[2]
  return {
    slug, title: data.title, date: data.date, category: data.category, tags: data.tags,
    excerpt: data.excerpt, cover: assetUrl(data.cover), featured: data.featured === true,
    body, html: DOMPurify.sanitize(md.render(body)), toc,
    minutes: Math.max(1, Math.ceil(body.replace(/\s/g, '').length / 350)),
  }
}

const sources = import.meta.glob('../content/*.md', { query: '?raw', import: 'default', eager: true })
export const posts = Object.entries(sources).map(([path, raw]) => parsePost(path.split('/').pop()!.replace(/\.md$/, ''), raw as string)).sort((a, b) => b.date.localeCompare(a.date))
export const categories = [...new Set(posts.map(p => p.category))]
export const tags = [...new Set(posts.flatMap(p => p.tags))]
export const formatDate = (date: string) => new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`))
export function filterPosts(collection: Post[], category = '', tag = '', query = '') {
  const needle = query.trim().toLocaleLowerCase()
  return collection.filter(p => (!category || p.category === category) && (!tag || p.tags.includes(tag)) && (!needle || `${p.title} ${p.excerpt} ${p.tags.join(' ')} ${p.body}`.toLocaleLowerCase().includes(needle)))
}
