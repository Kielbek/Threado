import { Component, input, output, computed } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-threado-button',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './threado-button.component.html',
})
export class ThreadoButtonComponent {
  customClasses = input<string>('');
  text = input<string>('');
  disabled = input<boolean>(false);
  isLoading = input<boolean>(false);
  variant = input<'primary' | 'outline'>('primary');

  clicked = output<void>();

  baseClasses = computed(() => {
    const common = `
      w-full font-extrabold rounded-full transition-all duration-200
      active:scale-95 flex items-center justify-center gap-2 p-2.5 xl:px-5
      disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none
      cursor-pointer text-sm
    `;

    const variants = {
      primary: `
        bg-threado text-black shadow-threado-glow
        hover:bg-[color-mix(in_srgb,var(--color-threado-accent),black_10%)]
        disabled:hover:bg-threado
      `,
      outline: `
        border border-threado text-black dark:text-white
        hover:bg-black/5 dark:hover:bg-white/5
      `
    };

    return `${common} ${variants[this.variant()]}`;
  });

  handleClick() {
    if (!this.disabled() && !this.isLoading()) {
      this.clicked.emit();
    }
  }
}
