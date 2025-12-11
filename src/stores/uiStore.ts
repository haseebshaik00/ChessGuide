import { defineStore } from 'pinia'
export type AppMode = 'learn' | 'play'
export type ThemeMode = 'light' | 'dark'

interface UiState {
  mode: AppMode
  theme: ThemeMode
}

export const useUiStore = defineStore('ui', {
  state(): UiState {
    return {
      mode: 'play',
      theme: 'dark',
    }
  },
  actions: {
    setMode(newMode: AppMode): void {
      this.mode = newMode
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('appMode', newMode)
      }
    },

    setTheme(newTheme: ThemeMode): void {
      this.theme = newTheme

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('theme', newTheme)

        const root = document.documentElement
        if (newTheme === 'dark') {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
    },

    initFromStorage(): void {
      if (typeof window === 'undefined') {
        return
      }

      const storedMode = window.localStorage.getItem('appMode') as AppMode | null
      const storedTheme = window.localStorage.getItem('theme') as ThemeMode | null

      if (storedMode === 'learn' || storedMode === 'play') {
        this.mode = storedMode
      }

      if (storedTheme === 'light' || storedTheme === 'dark') {
        this.setTheme(storedTheme)
      } else {
        this.setTheme('dark')
      }
    },
  },
})
