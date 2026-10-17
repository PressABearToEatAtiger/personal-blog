import { describe, it, expect } from 'vitest'
import { parsePost, filterPosts, posts } from '../src/lib/posts'

describe('local Markdown collection', () => {
  it('loads unique valid articles ordered by date', () => {
    expect(posts.length).toBeGreaterThanOrEqual(8)
    expect(new Set(posts.map(p => p.slug)).size).toBe(posts.length)
    expect(posts.map(p => p.date)).toEqual(posts.map(p => p.date).sort().reverse())
  })
  it('resolves every cover under the deployment base path', () => {
    expect(posts.every(post => post.cover.startsWith(`${import.meta.env.BASE_URL}images/`))).toBe(true)
  })
  it('filters category, tag and body search together', () => {
    const result = filterPosts(posts, '前端开发', 'Vue 3', '响应式')
    expect(result.length).toBeGreaterThan(0)
    expect(result.every(p => p.category === '前端开发' && p.tags.includes('Vue 3'))).toBe(true)
    expect(filterPosts(posts, '', '', '不可能存在的标题 xyz')).toHaveLength(0)
  })
  it('rejects missing metadata rather than rendering broken cards', () => {
    expect(() => parsePost('broken', '# hello')).toThrow()
    expect(() => parsePost('broken', '---\ntitle: test\ndate: 2026-99-99\ncategory: test\ntags: []\nexcerpt: test\ncover: /a.jpg\n---\nhello')).toThrow()
  })
  it('generates distinct heading ids and strips unsafe HTML', () => {
    const post = parsePost('safe', '---\ntitle: 安全\ndate: 2026-10-16\ncategory: 前端开发\ntags: [Vue 3]\nexcerpt: 示例\ncover: /images/forest.jpg\n---\n## 标题\n## 标题\n<script>alert(1)</script>\n[x](javascript:alert(1))')
    expect(post.toc.map(t => t.id)).toEqual(['section-0', 'section-1'])
    expect(post.html).not.toContain('<script>')
    expect(post.html).not.toContain('href="javascript:')
  })
})
