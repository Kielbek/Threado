import {Component, signal} from '@angular/core';
import {NavbarComponent} from './core/layout/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {MobileNavComponent} from './core/layout/mobile-nav.component/mobile-nav.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    RouterOutlet,
    MobileNavComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web');
}
