import { firstValueFrom } from "rxjs";
import { KeycloakService } from "../services/keycloak-service";
import {UserService} from '../services/user.service';

export function initializeApp(
  keycloak: KeycloakService,
  userService: UserService) {
  return async () => {
    try {
      const isAuthenticated = await keycloak.init();

      if (isAuthenticated) {
        await firstValueFrom(userService.fetchCurrentUser());
      }
    } catch (error) {
      console.error('Krytyczny błąd startu aplikacji:', error);
      throw error;
    }
  };
}
