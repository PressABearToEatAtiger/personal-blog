import { ref } from 'vue'
let initial = typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
try { const saved = localStorage.getItem('shiguang-theme'); if (saved) initial = saved === 'dark' } catch { /* Storage may be restricted by the browser. */ }
export const dark = ref(initial)
export function applyTheme() {
  document.documentElement.classList.toggle('dark', dark.value)
  document.documentElement.style.colorScheme = dark.value ? 'dark' : 'light'
}
export function toggleTheme() {
  dark.value = !dark.value
  applyTheme()
  try { localStorage.setItem('shiguang-theme', dark.value ? 'dark' : 'light') } catch { /* Keep the theme for this session. */ }
}
