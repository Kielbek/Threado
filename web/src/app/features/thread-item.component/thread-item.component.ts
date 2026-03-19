import {Component, input, signal} from '@angular/core';
import {BookmarkIcon, HeartIcon, LucideAngularModule, MessageCircleIcon, RepeatIcon, ShareIcon} from 'lucide-angular';
import {ThreadoAvatarComponent} from '../threado-avatar-component/threado-avatar-component';
import {ThreadoActionButtonComponent} from '../threado-action-button.component/threado-action-button.component';
import {ThreadResponse} from '../../core/model/thread/thread-response';
import {LinkifyPipe} from '../../core/pipes/linkify-pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-thread-item',
  imports: [
    LucideAngularModule,
    ThreadoAvatarComponent,
    ThreadoActionButtonComponent,
    LinkifyPipe,
    RouterLink
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

 thread = input<ThreadResponse>();

  isExpanded = signal(false);
  maxLength = 200;

  toggleText(event: Event) {
    event.stopPropagation();
    this.isExpanded.update(val => !val);
  }

}
