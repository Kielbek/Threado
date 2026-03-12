import {Component, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Bell, Bookmark, Home, LucideAngularModule, User, XIcon} from 'lucide-angular';
import {NavItemComponent} from '../../../features/nav-item-component/nav-item-component';
import {ThreadButtonComponent} from '../../../features/thread-button/thread-button.component';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    LucideAngularModule,
    NavItemComponent,
    ThreadButtonComponent
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

  isMobileMenuOpen = signal(false);

  toggleMenu() {
    this.isMobileMenuOpen.update(state => !state);
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }

  protected readonly open = open;
}
