import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {KeycloakService} from '../services/keycloak-service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);
  const token = keycloakService.keycloak.token;

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
