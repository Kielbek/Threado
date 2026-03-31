import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KeycloakService } from '../services/keycloak-service';

export const authGuard: CanActivateFn = async (route, state) => {
  const keycloakService = inject(KeycloakService);

  try {
    if (!keycloakService.keycloak) {
      return false;
    }

    const isLoggedIn = keycloakService.isLoggedIn();

    if (!isLoggedIn) {
      await keycloakService.login({
        redirectUri: window.location.origin + state.url
      });
      return false;
    }

    if (keycloakService.keycloak.isTokenExpired()) {
      await keycloakService.login({
        redirectUri: window.location.origin + state.url
      });
      return false;
    }

    return true;

  } catch (error) {
    return false;
  }
};
