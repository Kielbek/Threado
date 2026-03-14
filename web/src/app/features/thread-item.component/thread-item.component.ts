import {Component} from '@angular/core';
import {BookmarkIcon, HeartIcon, LucideAngularModule, MessageCircleIcon, RepeatIcon, ShareIcon} from 'lucide-angular';
import {ThreadoAvatarComponent} from '../threado-avatar-component/threado-avatar-component';
import {ThreadoActionButtonComponent} from '../threado-action-button.component/threado-action-button.component';

@Component({
  selector: 'app-thread-item',
  imports: [
    LucideAngularModule,
    ThreadoAvatarComponent,
    ThreadoActionButtonComponent
  ],
  templateUrl: './thread-item.component.html',
  styleUrl: './thread-item.component.css',
})
export class ThreadItemComponent {
  protected readonly RepeatIcon = RepeatIcon;
  protected readonly HeartIcon = HeartIcon;
  protected readonly ShareIcon = ShareIcon;
  protected readonly BookmarkIcon = BookmarkIcon;
  protected readonly MessageCircleIcon = MessageCircleIcon;
}
