import {Component, ElementRef, HostListener, inject, signal} from '@angular/core';
import {
  Bell,
  Bookmark,
  ChevronDownIcon,
  EllipsisIcon,
  GlobeIcon,
  Home,
  LucideAngularModule,
  SunIcon,
  User
} from 'lucide-angular';
import {ThreadoAvatarComponent} from '../../../features/threado-avatar-component/threado-avatar-component';
import {
  ThreadoActionButtonComponent
} from '../../../features/threado-action-button.component/threado-action-button.component';
import {KeycloakService} from '../../services/keycloak-service';
import {NgClass} from '@angular/common';
import {ThreadoButtonComponent} from '../../../features/threado-button-component/threado-button.component';
import {NavItemComponent} from '../../../features/nav-item-component/nav-item-component';
import {RouterLink} from '@angular/router';
import {ThemeMode, ThemeService} from '../../services/theme.service';
import {UiService} from '../../services/ui.service';

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
  private elementRef = inject(ElementRef);
  themeService = inject(ThemeService);

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

  currentLanguage = signal('pl'); // lub pobieranie z serwisu tłumaczeń

  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLang = selectElement.value;
    this.currentLanguage.set(selectedLang);
    // np. this.translateService.use(selectedLang);
  }

  protected readonly GlobeIcon = GlobeIcon;
}
