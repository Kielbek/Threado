import {inject, Injectable} from '@angular/core';
import Keycloak, { KeycloakLoginOptions } from 'keycloak-js';
import { ThemeService } from "./theme.service";

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private themeService = inject(ThemeService);

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8180',
        realm: 'Threado',
        clientId: 'bsn'
        }
      )
    }

    return this._keycloak;
  }

  async init() {
    const authenticated = await this.keycloak?.init({
      onLoad: 'check-sso',
    })

    return authenticated ?? false;
  }

  private setKeycloakThemeCookie() {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = this.themeService.currentTheme();
    const resolvedTheme = currentTheme === 'dark' || (currentTheme === 'system' && isSystemDark) ? 'dark' : 'light';

    document.cookie = `app_theme=${resolvedTheme}; path=/; max-age=3600`;
  }

  login(options?: KeycloakLoginOptions): Promise<void> {
    this.setKeycloakThemeCookie();
    return this.keycloak.login(options);
  }

  register(options?: KeycloakLoginOptions): Promise<void> {
    this.setKeycloakThemeCookie();
    return this.keycloak.register(options);
  }

  updatePasswordDirectly(): Promise<void> {
    this.setKeycloakThemeCookie();
    return this.keycloak!.login({ action: 'UPDATE_PASSWORD' });
  }

  getUserEmailFromToken(): string | null {
    if (this.keycloak && this.keycloak.tokenParsed) {
      return this.keycloak.tokenParsed['email'] || null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.keycloak?.authenticated;
  }
}
