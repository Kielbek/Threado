import {Component, computed, DOCUMENT, effect, HostListener, inject, Renderer2} from '@angular/core';
import {
  Bookmark,
  ChevronDown, Home,
  LogOut,
  LucideAngularModule,
  MessageSquare,
  Rss,
  Search,
  Settings,
  User,
  X
} from 'lucide-angular';
import {RouterLink} from '@angular/router';
import {ThreadoAvatarComponent} from '../../../features/threado-avatar-component/threado-avatar-component';
import {KeycloakService} from '../../services/keycloak-service';
import {UiService} from '../../services/ui.service';
import {NavItemComponent} from '../../../features/nav-item-component/nav-item-component';
import {AuthSidebarComponent} from '../../../features/auth-sidebar-component/auth-sidebar-component';
import {UserService} from '../../services/user.service';
import {AsyncPipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-mobile-nav',
  imports: [
    RouterLink,
    LucideAngularModule,
    ThreadoAvatarComponent,
    NavItemComponent,
    AuthSidebarComponent,
    AsyncPipe
  ],
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.css',
})
export class MobileNavComponent {
  readonly XIcon = X;
  readonly HomeIcon = Home;
  readonly UserIcon = User;
  readonly MessageSquareIcon = MessageSquare;
  readonly BookmarkIcon = Bookmark;
  readonly SettingsIcon = Settings;
  readonly ChevronDownIcon = ChevronDown;
  readonly LogOutIcon = LogOut;

  protected ksService = inject(KeycloakService);
  protected uiService = inject(UiService);
  protected userService = inject(UserService);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  currentUser = toSignal(this.userService.currentUser$);

  readonly menuItems = computed(() => {
    const username = this.currentUser()?.username;

    return [
      { label: 'Home', route: '/home', icon: this.HomeIcon },
      {
        label: 'Profile',
        route: username ? `/@${username}` : '/profile',
        icon: this.UserIcon
      },
      { label: 'Messages', route: '/messages', icon: this.MessageSquareIcon },
      { label: 'Bookmarks', route: '/bookmarks', icon: this.BookmarkIcon },
      { label: 'Settings', route: '/settings', icon: this.SettingsIcon },
    ];
  });

  constructor() {
    effect(() => {
      if (this.uiService.isMobileMenuOpen()) {
        this.renderer.addClass(this.document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(this.document.body, 'overflow-hidden');
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 1024 && this.uiService.isMobileMenuOpen()) {
      this.uiService.closeMobileMenu();
    }
  }
}
