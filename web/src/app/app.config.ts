import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {KeycloakService} from './core/services/keycloak-service';
import {UserService} from "./core/services/user.service";
import {initializeApp} from './core/init/app.init';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {apiUrlInterceptor} from "./core/interceptor/api-url-interceptor";
import {httpTokenInterceptor} from './core/interceptor/http-token-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      apiUrlInterceptor,
      httpTokenInterceptor
    ])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [KeycloakService, UserService],
    },
  ]
};
