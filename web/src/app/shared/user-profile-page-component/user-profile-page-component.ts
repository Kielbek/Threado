import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {
  ArrowLeftIcon,
  CalendarIcon,
  LucideAngularModule,
  MapPinIcon,
  UserIcon
} from 'lucide-angular';
import { ThreadoButtonComponent } from '../../features/threado-button-component/threado-button.component';
import { DatePipe } from '@angular/common';
import { ThreadItemComponent } from '../../features/thread-item.component/thread-item.component';
import { PageHeaderComponent } from '../../features/page-header.component/page-header.component';
import {KeycloakService} from '../../core/services/keycloak-service';

@Component({
  selector: 'app-user-profile-page-component',
  standalone: true, // Pamiętaj o standalone, jeśli używasz nowoczesnego Angulara
  imports: [
    LucideAngularModule,
    ThreadoButtonComponent,
    DatePipe,
    ThreadItemComponent,
    PageHeaderComponent
  ],
  templateUrl: './user-profile-page-component.html',
  styleUrl: './user-profile-page-component.css',
})
export class UserProfilePageComponent {
  private keycloakService = inject(KeycloakService);

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

  constructor() {
    effect(() => {
      console.log('Czy to mój profil?:', this.isOwner());
      if (this.cleanUsername()) {
        this.loadProfile(this.cleanUsername());
      }
    }, { allowSignalWrites: true });
  }

  private loadProfile(username: string) {
    console.log('📡 Wywołuję API dla:', username);
  }

  protected readonly CalendarIcon = CalendarIcon;
  protected readonly MapPinIcon = MapPinIcon;
  protected readonly UserIcon = UserIcon;
  protected readonly ArrowLeftIcon = ArrowLeftIcon
}
