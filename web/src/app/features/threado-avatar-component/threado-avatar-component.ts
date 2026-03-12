import {Component, input} from '@angular/core';

@Component({
  selector: 'app-threado-avatar',
  imports: [],
  templateUrl: './threado-avatar-component.html',
  styleUrl: './threado-avatar-component.css',
})
export class ThreadoAvatarComponent {
  avatarUrl = input<string>('');
  size = input<string>('3.5rem');
}
