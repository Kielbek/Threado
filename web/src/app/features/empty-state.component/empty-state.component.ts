import { Component, input, output } from '@angular/core';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-empty-state',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.css',
})
export class EmptyStateComponent {
  title = input.required<string>();

  description = input<string>('');
  icon = input<any>(null);

  actionText = input<string>('');
  actionLink = input<string | any[]>('');

  actionClick = output<void>();
}
