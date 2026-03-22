import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;

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

  updatePasswordDirectly(): Promise<void> {
    if (this.keycloak) {
      return this.keycloak.login({ action: 'UPDATE_PASSWORD' });
    }
    return Promise.resolve();
  }

  getUserEmailFromToken(): string | null {
    if (this.keycloak && this.keycloak.tokenParsed) {
      return this.keycloak.tokenParsed['email'] || null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    console.log(this._keycloak?.token);
    return !!this.keycloak?.authenticated;
  }
}
