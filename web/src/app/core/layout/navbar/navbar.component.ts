import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Bell, Bookmark, Home, LucideAngularModule, User, XIcon} from 'lucide-angular';
import {NavItemComponent} from '../../../features/nav-item-component/nav-item-component';
import {ThreadoButtonComponent} from '../../../features/threado-button-component/threado-button.component';
import {ThreadoAvatarComponent} from '../../../features/threado-avatar-component/threado-avatar-component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    NavItemComponent,
    ThreadoButtonComponent,
    ThreadoAvatarComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly HomeIcon = Home;
  readonly BellIcon = Bell;
  readonly BookmarkIcon = Bookmark;
  readonly UserIcon = User;
  readonly XIcon = XIcon;

  readonly menuItems = [
    { label: 'Home', route: '/home', icon: this.HomeIcon },
    { label: 'Notifications', route: '/notifications', icon: this.BellIcon },
    { label: 'Bookmarks', route: '/bookmarks', icon: this.BookmarkIcon },
    { label: 'Profile', route: '/profile', icon: this.UserIcon },
  ];
}
