import {Component, signal} from '@angular/core';
import {LucideAngularModule, MessageCircle} from "lucide-angular";
import {Notification} from '../../core/model/notification';
import {NotificationItemComponent} from '../../features/notification-item.component/notification-item.component';

@Component({
  selector: 'app-notifications-page.component',
  imports: [
    LucideAngularModule,
    NotificationItemComponent
  ],
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.css',
})
export class NotificationsPageComponent {
  readonly MessageIcon = MessageCircle;

  notifications = signal<Notification[]>([
    {
      id: '1',
      type: 'LIKE',
      user: { name: 'Kasia', username: 'kasia_dev', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
      content: 'Ten nowy design strony profilu wygląda obłędnie! 🔥',
      timeAgo: '10 min',
      isRead: false
    },
    {
      id: '2',
      type: 'FOLLOW',
      user: { name: 'Janek', username: 'janek_coder', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
      timeAgo: '2 godz',
      isRead: true
    },
    {
      id: '3',
      type: 'REPLY',
      user: { name: 'Piotr', username: 'piotrek', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
      content: 'A jak rozwiązałeś problem z Tailwind v4 i opacity?',
      timeAgo: '1 dzień',
      isRead: true
    }
  ]);
}
