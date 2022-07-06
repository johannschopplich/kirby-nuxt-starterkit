import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  if (matchMedia('(hover: hover)').matches) return

  // Set actual vh on mobile
  document.documentElement.style.setProperty(
    '--vh',
    `${window.innerHeight * 0.01}px`
  )
})
