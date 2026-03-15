import {effect, Injectable, signal} from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = signal<ThemeMode>('system');

  constructor() {
    const storedTheme = localStorage.getItem('threado-theme') as ThemeMode;
    if (storedTheme) {
      this.currentTheme.set(storedTheme);
    }

    effect(() => {
      this.applyTheme(this.currentTheme());
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.currentTheme() === 'system') {
        this.applyTheme('system');
      }
    });
  }

  setTheme(theme: ThemeMode) {
    this.currentTheme.set(theme);
    localStorage.setItem('threado-theme', theme);
  }

  private applyTheme(theme: ThemeMode) {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = theme === 'dark' || (theme === 'system' && isSystemDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
