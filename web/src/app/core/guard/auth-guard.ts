import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {KeycloakService} from '../services/keycloak-service';

export const authGuard: CanActivateFn = (route, state) => {
  const keycloakService = inject(KeycloakService)

  return !keycloakService.keycloak?.isTokenExpired();
};
