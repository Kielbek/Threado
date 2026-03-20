import {Component, computed, input} from '@angular/core';
import {NgClass} from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-threado-action-button',
  imports: [
    NgClass,
    LucideAngularModule,
  ],
  templateUrl: './threado-action-button.component.html',
  styleUrl: './threado-action-button.component.css',
})
export class ThreadoActionButtonComponent {
  icon = input.required<any>();
  count = input<number | string>();
  variant = input<'accent' | 'red' | 'blue' | 'green'>('accent');
  customClass = input<string>('');
  isActive = input<boolean>(false);
  variantClass = computed(() => `btn-${this.variant()}`);
}
