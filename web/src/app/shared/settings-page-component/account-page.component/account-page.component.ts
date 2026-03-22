import {Component, inject, OnInit, signal} from '@angular/core';
import {ExternalLinkIcon, KeyIcon, LucideAngularModule, MailIcon, ShieldCheckIcon} from 'lucide-angular';
import {PageHeaderComponent} from '../../../features/page-header.component/page-header.component';
import {UserService} from '../../../core/services/user.service';
import {KeycloakService} from '../../../core/services/keycloak-service';

@Component({
  selector: 'app-account-page.component',
  imports: [
    LucideAngularModule,
    PageHeaderComponent
  ],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent implements OnInit {
  private readonly keycloakService = inject(KeycloakService);

  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly ExternalLinkIcon = ExternalLinkIcon;
  readonly KeyIcon = KeyIcon;
  readonly MailIcon = MailIcon;

  userEmail = signal<string | null>(null);

  ngOnInit() {
      this.userEmail.set(this.keycloakService.getUserEmailFromToken());
  }

  redirectToKeycloakAccount() {
    this.keycloakService.updatePasswordDirectly();
  }
}
