import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {ArrowLeftIcon, CalendarIcon, LinkIcon, LucideAngularModule, MapPinIcon, UserIcon} from 'lucide-angular';
import {ThreadoButtonComponent} from '../../features/threado-button-component/threado-button.component';
import {DatePipe} from '@angular/common';
import {PageHeaderComponent} from '../../features/page-header.component/page-header.component';
import {KeycloakService} from '../../core/services/keycloak-service';
import {UserService} from '../../core/services/user.service';
import {ThreadoAvatarComponent} from '../../features/threado-avatar-component/threado-avatar-component';

@Component({
  selector: 'app-user-profile-page-component',
  imports: [
    LucideAngularModule,
    ThreadoButtonComponent,
    DatePipe,
    PageHeaderComponent,
    ThreadoAvatarComponent
  ],
  templateUrl: './user-profile-page-component.html',
  styleUrl: './user-profile-page-component.css',
})
export class UserProfilePageComponent {
  private keycloakService = inject(KeycloakService);
  private userService = inject(UserService);

  readonly usernameFromRoute = input.required<string>({ alias: 'username' });

  readonly cleanUsername = computed(() => {
    const raw = this.usernameFromRoute();
    return raw.startsWith('@') ? raw.substring(1) : raw;
  });

  readonly isOwner = computed(() => {
    const loggedInUser = this.keycloakService.keycloak?.tokenParsed?.['preferred_username'];
    return loggedInUser === this.cleanUsername();
  });

  user = signal<any | null>(null);
  isLoading = signal<boolean>(false);
  hasError = signal<boolean>(false);

  constructor() {
    effect(() => {
      const username = this.cleanUsername();
      if (username) {
        this.loadProfile(username);
      }
    }, { allowSignalWrites: true });
  }

  private loadProfile(username: string) {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.user.set(null);

    this.userService.getPublicProfile(username).subscribe({
      next: (profileData) => {
        this.user.set(profileData);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  protected readonly CalendarIcon = CalendarIcon;
  protected readonly MapPinIcon = MapPinIcon;
  protected readonly UserIcon = UserIcon;
  protected readonly ArrowLeftIcon = ArrowLeftIcon;
  protected readonly LinkIcon = LinkIcon;
}
