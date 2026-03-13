import {Component, inject, OnInit} from '@angular/core';
import {ThreadoButtonComponent} from '../threado-button-component/threado-button.component';
import {KeycloakService} from '../../core/services/keycloak-service';

@Component({
  selector: 'app-auth-sidebar',
  imports: [
    ThreadoButtonComponent
  ],
  templateUrl: './auth-sidebar-component.html',
  styleUrl: './auth-sidebar-component.css',
})
export class AuthSidebarComponent implements OnInit {
  private readonly ksService = inject(KeycloakService);

  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = this.ksService.isLoggedIn();
  }

  login() {
    this.ksService.keycloak?.login();
  }

  protected register() {
    this.ksService.keycloak.register()
  }
}
