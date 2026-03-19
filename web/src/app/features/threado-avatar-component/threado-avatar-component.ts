import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-threado-avatar',
  imports: [],
  templateUrl: './threado-avatar-component.html',
  styleUrl: './threado-avatar-component.css',
})
export class ThreadoAvatarComponent {
  avatarUrl = input<string | null | undefined>('');
  sizeClasses = input<string>('w-14 h-14');

  displayUrl = computed(() => this.avatarUrl() || 'user-image.png');
}
