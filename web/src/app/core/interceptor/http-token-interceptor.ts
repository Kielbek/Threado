import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from '../services/keycloak-service';
import { from, switchMap } from 'rxjs';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService);

  const excludedUrls = ['/assets', '/clients/public'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (isExcluded || !keycloakService.isLoggedIn()) {
    return next(req);
  }

  return from(keycloakService.keycloak.updateToken(30)).pipe(
    switchMap(() => {
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
    })
  );
};
