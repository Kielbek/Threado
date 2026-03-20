import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {KeycloakService} from '../../core/services/keycloak-service';
import {UserService} from '../../core/services/user.service';
import {ThreadService} from '../../core/services/thread.service';
import {ThreadFeedComponent} from '../../features/thread-feed.component/thread-feed.component';
import {EMPTY} from 'rxjs';
import {UserProfileSkeletonComponent} from './user-profile-skeleton.component/user-profile-skeleton.component';
import {UserProfileNotFoundComponent} from './user-profile-not-found.component/user-profile-not-found.component';
import {UserProfileHeaderComponent} from './user-profile-header.component/user-profile-header.component';

@Component({
  selector: 'app-user-profile-page',
  imports: [
    LucideAngularModule,
    ThreadFeedComponent,
    UserProfileSkeletonComponent,
    UserProfileNotFoundComponent,
    UserProfileHeaderComponent
  ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css',
})
export class UserProfilePageComponent {
  private keycloakService = inject(KeycloakService);
  private userService = inject(UserService);
  private threadService = inject(ThreadService);

  readonly usernameFromRoute = input.required<string>({ alias: 'username' });
  readonly currentCacheKey = computed(() => `home-${this.usernameFromRoute()}-profile`);

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

  userThreadsFetcher = (page: number, size: number) => {
    const authorId = this.user()?.id;

    if (!authorId) {
      return EMPTY;
    }

    return this.threadService.getUserThreads(authorId, page, size);
  };
}
