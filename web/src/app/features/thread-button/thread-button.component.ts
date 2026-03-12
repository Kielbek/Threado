import {Component, input, output} from '@angular/core';
import {Feather, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-thread-button',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './thread-button.component.html',
  styleUrl: './thread-button.component.css',
})
export class ThreadButtonComponent {
  readonly PostIcon = Feather;

  customClasses = input<string>('');
  showText = input<boolean>(true);

  clicked = output<void>();

  readonly defaultClasses = 'bg-[#32cd32] text-black font-extrabold rounded-full hover:bg-[#2eb82e] transition-all shadow-[0_0_15px_rgba(50,205,50,0.3)] active:scale-95 flex items-center justify-center';
}
