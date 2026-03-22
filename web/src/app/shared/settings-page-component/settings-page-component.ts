import {Component, inject} from '@angular/core';
import {
  BellIcon,
  ChevronRightIcon,
  LogOutIcon,
  LucideAngularModule,
  MonitorIcon,
  ShieldIcon,
  UserIcon
} from 'lucide-angular';
import {PageHeaderComponent} from '../../features/page-header.component/page-header.component';
import {NavItemComponent} from '../../features/nav-item-component/nav-item-component';
import {NavItem} from '../../core/model/nav-item';
import {KeycloakService} from '../../core/services/keycloak-service';

export const SETTINGS_MENU: NavItem[] = [
  {
    route: '/settings/profile',
    label: 'Edytuj profil',
    description: 'Zmień swoje imię, opis, tło i avatar.',
    icon: UserIcon,
    showArrow: true
  },
  {
    route: '/settings/account',
    label: 'Konto i bezpieczeństwo',
    description: 'Zarządzaj hasłem, emailem i bezpieczeństwem.',
    icon: ShieldIcon,
    showArrow: true
  },
  {
    route: '/settings/preferences',
    label: 'Preferencje',
    description: 'Dostosuj motyw i wygląd aplikacji.',
    icon: MonitorIcon,
    showArrow: true
  },
  {
    route: '/settings/notifications',
    label: 'Powiadomienia',
    description: 'Zdecyduj o czym chcesz być informowany.',
    icon: BellIcon,
    disabled: true,
    showArrow: true
  }
];

@Component({
  selector: 'app-settings-page-component',
  imports: [
    LucideAngularModule,
    PageHeaderComponent,
    NavItemComponent
  ],
  templateUrl: './settings-page-component.html',
  styleUrl: './settings-page-component.css',
})
export class SettingsPageComponent {
  private ksService = inject(KeycloakService)

  readonly menuItems = SETTINGS_MENU
  protected readonly ChevronRightIcon = ChevronRightIcon;
  protected readonly LogOutIcon = LogOutIcon;

  protected onLogout() {
    this.ksService.keycloak.logout()
  }
}
