import {Component, inject, signal} from '@angular/core';
import {Bell, Bookmark, ChevronDownIcon, EllipsisIcon, Home, LucideAngularModule, SunIcon, User} from 'lucide-angular';
import {ThreadoAvatarComponent} from '../../../features/threado-avatar-component/threado-avatar-component';
import {
  ThreadoActionButtonComponent
} from '../../../features/threado-action-button.component/threado-action-button.component';
import {KeycloakService} from '../../services/keycloak-service';
import {NgClass} from '@angular/common';
import {ThreadoButtonComponent} from '../../../features/threado-button-component/threado-button.component';
import {NavItemComponent} from '../../../features/nav-item-component/nav-item-component';
import {RouterLink} from '@angular/router';

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
    NgClass,
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
  readonly ChevronDownIcon = ChevronDownIcon;
  readonly SunIcon = SunIcon;

  readonly menuItems = [
    { label: 'Home', route: '/home', icon: this.HomeIcon },
    { label: 'Notifications', route: '/notifications', icon: this.BellIcon },
    { label: 'Bookmarks', route: '/bookmarks', icon: this.BookmarkIcon },
    { label: 'Profile', route: '/profile', icon: this.UserIcon },
  ];

  isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update(val => !val);
  }

}
