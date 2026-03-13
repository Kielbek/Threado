import {Component, input, output} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-threado-button',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './threado-button.component.html',

})
export class ThreadoButtonComponent {
  customClasses = input<string>('');
  text = input<string>('');
  disabled = input<boolean>(false);
  isLoading = input<boolean>(false);

  clicked = output<void>();

  readonly defaultClasses = `
    bg-threado w-full text-black font-extrabold rounded-full
    hover:bg-[color-mix(in_srgb,var(--color-threado-accent),black_10%)]
    transition-all duration-200
    shadow-threado-glow active:scale-95 flex items-center justify-center gap-2 p-3 xl:px-5
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-threado disabled:active:scale-100 disabled:shadow-none
    cursor-pointer
  `;

  handleClick() {
    if (!this.disabled() && !this.isLoading()) {
      this.clicked.emit();
    }
  }}
