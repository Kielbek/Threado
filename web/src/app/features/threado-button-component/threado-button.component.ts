import {Component, input, output} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-threado-button',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './threado-button.component.html',
  styleUrl: './threado-button.component.css',
})
export class ThreadoButtonComponent {
  customClasses = input<string>('');
  text = input<string>('');
  disabled = input<boolean>(false);
  isLoading = input<boolean>(false);

  clicked = output<void>();

  readonly defaultClasses = `
    bg-[#32cd32] w-full text-black font-extrabold rounded-full
    hover:bg-[#2eb82e] transition-all duration-200
    shadow-[0_0_15px_rgba(50,205,50,0.3)]
    active:scale-95 flex items-center justify-center gap-2 p-3 xl:px-5
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#32cd32] disabled:active:scale-100 disabled:shadow-none
    cursor-pointer
  `;

  handleClick() {
    if (!this.disabled() && !this.isLoading()) {
      this.clicked.emit();
    }
  }}
