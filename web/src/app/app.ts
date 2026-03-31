import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MobileNavComponent} from './core/layout/mobile-nav.component/mobile-nav.component';
import {AuthSidebarComponent} from './features/auth-sidebar-component/auth-sidebar-component';
import {HeaderComponent} from './core/layout/header.component/header.component';
import {NavbarComponent} from './core/layout/navbar.component/navbar.component';
import {ToastContainerComponent} from './features/toast-container.component/toast-container.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MobileNavComponent,
    AuthSidebarComponent,
    HeaderComponent,
    NavbarComponent,
    ToastContainerComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web');
}
