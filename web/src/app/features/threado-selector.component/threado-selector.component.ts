import { Component, computed, inject, input } from '@angular/core';
import {NgClass} from '@angular/common';
import {ChevronDownIcon, LucideAngularModule, MonitorIcon, MoonIcon, SunIcon} from 'lucide-angular';
import {ThemeService} from '../../core/services/theme.service';

@Component({
  selector: 'app-threado-selector',
  imports: [
    NgClass,
    LucideAngularModule
  ],
  templateUrl: './threado-selector.component.html',
  styleUrl: './threado-selector.component.css',
})
export class ThreadoSelectorComponent {
  public readonly themeService = inject(ThemeService);

  variant = input<'full' | 'compact'>('full');
  label = input<string>('Theme');
  description = input<string>('');

  readonly ChevronDownIcon = ChevronDownIcon;

  currentIcon = computed(() => {
    const theme = this.themeService.currentTheme();
    switch (theme) {
      case 'light': return SunIcon;
      case 'dark': return MoonIcon;
      default: return MonitorIcon;
    }
  });

  onThemeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.themeService.setTheme(select.value as 'light' | 'dark' | 'system');
  }
}
