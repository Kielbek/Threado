import {Component, effect, HostListener, inject, input, output, Renderer2} from '@angular/core';
import {LucideAngularModule, X} from 'lucide-angular';

@Component({
  selector: 'app-threado-modal',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './threado-modal-component.html',
  styleUrl: './threado-modal-component.css',
})
export class ThreadoModalComponent {
  readonly CloseIcon = X;
  private renderer = inject(Renderer2);

  isOpen = input.required<boolean>();
  title = input<string>('');
  description = input<string>('');

  close = output<void>();

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.renderer.addClass(document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(document.body, 'overflow-hidden');
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen()) {
      this.close.emit();
    }
  }}
