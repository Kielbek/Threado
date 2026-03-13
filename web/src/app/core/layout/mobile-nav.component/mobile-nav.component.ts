import { Component } from '@angular/core';
import {Bell, Bookmark, Home, LucideAngularModule, Plus, User} from "lucide-angular";
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.css',
})
export class MobileNavComponent {
  readonly HomeIcon = Home;
  readonly BellIcon = Bell;
  readonly BookmarkIcon = Bookmark;
  readonly UserIcon = User;
  readonly PlusIcon = Plus;

  readonly menuItems = [
    { label: 'Home', route: '/home', icon: this.HomeIcon },
    { label: 'Notifications', route: '/notifications', icon: this.BellIcon },
    { label: 'Bookmarks', route: '/bookmarks', icon: this.BookmarkIcon },
    { label: 'Profile', route: '/profile', icon: this.UserIcon },
  ];
}
