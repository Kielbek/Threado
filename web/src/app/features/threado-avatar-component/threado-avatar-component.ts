import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-threado-avatar',
  imports: [],
  templateUrl: './threado-avatar-component.html',
  styleUrl: './threado-avatar-component.css',
})
export class ThreadoAvatarComponent {
  avatarUrl = input<string | null | undefined>('');
  size = input<string>('3.5rem');

  displayUrl = computed(() => this.avatarUrl() || 'user-image.png');
}
