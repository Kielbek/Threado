import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  ExternalLinkIcon, KeyIcon, LucideAngularModule, MailIcon,
  ShieldCheckIcon, ShieldIcon, SmartphoneIcon, MonitorIcon,
  LogOutIcon, HistoryIcon, CopyIcon, TrashIcon, LinkIcon
} from 'lucide-angular';

import { PageHeaderComponent } from '../../../features/page-header.component/page-header.component';
import { KeycloakService } from '../../../core/services/keycloak-service';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [LucideAngularModule, PageHeaderComponent, DatePipe],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent implements OnInit {
  private readonly keycloakService = inject(KeycloakService);
  private readonly toastService = inject(ToastService);

  protected readonly ShieldCheckIcon = ShieldCheckIcon;
  protected readonly ShieldIcon = ShieldIcon;
  protected readonly ExternalLinkIcon = ExternalLinkIcon;
  protected readonly KeyIcon = KeyIcon;
  protected readonly MailIcon = MailIcon;
  protected readonly SmartphoneIcon = SmartphoneIcon;
  protected readonly MonitorIcon = MonitorIcon;
  protected readonly LogOutIcon = LogOutIcon;
  protected readonly HistoryIcon = HistoryIcon;
  protected readonly CopyIcon = CopyIcon;
  protected readonly TrashIcon = TrashIcon;
  protected readonly LinkIcon = LinkIcon;

  userEmail = signal<string | null>(null);
  isEmailVerified = signal<boolean>(false);
  lastLogin = signal<string | null>(null);
  identityProvider = signal<string | null>(null);
  activeSessions = signal<any[]>([]);

  async ngOnInit() {
    await this.refreshAndLoadTokenData();
    await this.loadActiveSessions();
  }

  onAction(type: 'CONFIGURE_TOTP' | 'UPDATE_PASSWORD' | 'VERIFY_EMAIL') {
    this.keycloakService.triggerAction(type);
  }

  goToSessions() {
    const url = `${this.keycloakService.keycloak.authServerUrl}/realms/${this.keycloakService.keycloak.realm}/account/account-security/device-activity`;
    window.location.href = url;
  }

  goToAccountDeletion() {
    const url = `${this.keycloakService.keycloak.authServerUrl}/realms/${this.keycloakService.keycloak.realm}/account/personal-info`;
    window.location.href = url;
  }

  copyEmail() {
    const email = this.userEmail();
    if (email) {
      navigator.clipboard.writeText(email)
        .then(() => this.toastService.success('Email address copied to clipboard', 'Success'))
        .catch(() => this.toastService.error('Failed to copy email', 'Error'));
    }
  }

  private async refreshAndLoadTokenData() {
    try {
      await this.keycloakService.keycloak.updateToken(5);
    } catch (e) {
      this.toastService.warning('Session preview might be outdated. Please refresh.', 'Session Warning');
    }

    const token = this.keycloakService.keycloak.tokenParsed as any;

    if (token) {
      this.userEmail.set(token.email || null);
      this.isEmailVerified.set(token.email_verified === true);

      try {
        const userInfo: any = await this.keycloakService.keycloak.loadUserInfo();
        const idp = userInfo.identity_provider || token.identity_provider || userInfo.idp_alias || token.idp_alias;
        this.identityProvider.set(idp || null);
      } catch (e) {
        this.identityProvider.set(token.identity_provider || null);
      }

      if (token.iat) {
        const date = new Date(token.iat * 1000);
        this.lastLogin.set(date.toLocaleString('pl-PL', {
          day: 'numeric', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        }));
      }
    } else {
      this.toastService.error('Could not load account data', 'Profile Error');
    }
  }

  private async loadActiveSessions() {
    try {
      const sessions = await this.keycloakService.getActiveSessions();
      this.activeSessions.set(sessions);
    } catch (e) {
      this.toastService.error('Failed to load active sessions', 'Security Error');
    }
  }
}
