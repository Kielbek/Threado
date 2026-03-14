import { Component, input } from '@angular/core';
import {Heart, LucideAngularModule, MessageCircle, Repeat2, UserPlus} from 'lucide-angular';
import {NgClass} from '@angular/common';
import {Notification} from '../../core/model/notification';

@Component({
  selector: 'app-notification-item',
  imports: [
    LucideAngularModule,
    NgClass
  ],
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.css',
})
export class NotificationItemComponent {
  notif = input.required<Notification>();

  readonly HeartIcon = Heart;
  readonly RepostIcon = Repeat2;
  readonly MessageIcon = MessageCircle;
  readonly FollowIcon = UserPlus;
}
