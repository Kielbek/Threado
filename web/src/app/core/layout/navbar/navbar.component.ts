import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Bell, Bookmark, EllipsisIcon, Home, LucideAngularModule, User} from 'lucide-angular';
import {NavItemComponent} from '../../../features/nav-item-component/nav-item-component';
import {ThreadoButtonComponent} from '../../../features/threado-button-component/threado-button.component';
import {ThreadoAvatarComponent} from '../../../features/threado-avatar-component/threado-avatar-component';
import {
  ThreadoActionButtonComponent
} from '../../../features/threado-action-button.component/threado-action-button.component';
import {KeycloakService} from '../../services/keycloak-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    NavItemComponent,
    ThreadoButtonComponent,
    ThreadoAvatarComponent,
    ThreadoActionButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly ksService = inject(KeycloakService);

  readonly HomeIcon = Home;
  readonly BellIcon = Bell;
  readonly BookmarkIcon = Bookmark;
  readonly UserIcon = User;
  readonly EllipsisIcon = EllipsisIcon;

  readonly menuItems = [
    { label: 'Home', route: '/home', icon: this.HomeIcon },
    { label: 'Notifications', route: '/notifications', icon: this.BellIcon },
    { label: 'Bookmarks', route: '/bookmarks', icon: this.BookmarkIcon },
    { label: 'Profile', route: '/profile', icon: this.UserIcon },
  ];

}
