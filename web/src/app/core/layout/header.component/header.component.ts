import {Component, inject} from '@angular/core';
import {LucideAngularModule, MenuIcon} from 'lucide-angular';
import {UiService} from '../../services/ui.service';
import {KeycloakService} from '../../services/keycloak-service';

@Component({
  selector: 'app-header',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected readonly MenuIcon = MenuIcon;

  ui = inject(UiService);

}
