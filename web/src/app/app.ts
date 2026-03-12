import {Component, signal} from '@angular/core';
import {NavbarComponent} from './core/layout/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web');
}
