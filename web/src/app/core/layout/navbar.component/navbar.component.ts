import {Component, computed, ElementRef, HostListener, inject, signal} from '@angular/core';
import {
  Bell,
  Bookmark,
  ChevronDownIcon,
  EllipsisIcon,
  GlobeIcon,
  Home,
  LucideAngularModule, SettingsIcon,
  SunIcon,
  User
} from 'lucide-angular';
import {ThreadoAvatarComponent} from '../../../features/threado-avatar-component/threado-avatar-component';
import {
  ThreadoActionButtonComponent
} from '../../../features/threado-action-button.component/threado-action-button.component';
import {KeycloakService} from '../../services/keycloak-service';
import {AsyncPipe, NgClass} from '@angular/common';
import {ThreadoButtonComponent} from '../../../features/threado-button-component/threado-button.component';
import {NavItemComponent} from '../../../features/nav-item-component/nav-item-component';
import {RouterLink} from '@angular/router';
import {ThemeMode, ThemeService} from '../../services/theme.service';
import {UserService} from '../../services/user.service';
import {UiService} from '../../services/ui.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ThreadoSelectorComponent} from '../../../features/threado-selector.component/threado-selector.component';

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
    AsyncPipe,
    ThreadoSelectorComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly ksService = inject(KeycloakService);
  userService = inject(UserService);
  private elementRef = inject(ElementRef);
  themeService = inject(ThemeService);

  currentUser = toSignal(this.userService.currentUser$);

  readonly EllipsisIcon = EllipsisIcon;

  readonly menuItems = computed(() => {
    const username = this.currentUser()?.username;

    return [
      { label: 'Home', route: '/home', icon: Home },
      { label: 'Notifications', route: '/notifications', icon: Bell },
      { label: 'Bookmarks', route: '/bookmarks', icon: Bookmark },
      {
        label: 'Profile',
        route: username ? `/@${username}` : '/profile',
        icon: User
      },
      { label: 'Settings', route: '/settings', icon: SettingsIcon },
    ];
  });

  isDropdownOpen = signal(false);

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: EventTarget | null): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement as Node);

    if (!clickedInside) {
      this.isDropdownOpen.set(false);
    }
  }

  toggleDropdown() {
    this.isDropdownOpen.update(val => !val);
  }

  onThemeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.themeService.setTheme(selectElement.value as ThemeMode);
  }

  currentLanguage = signal('pl');

  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLang = selectElement.value;
    this.currentLanguage.set(selectedLang);
    // np. this.translateService.use(selectedLang);
  }
}
