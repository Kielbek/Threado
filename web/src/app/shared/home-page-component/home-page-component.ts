import { Component } from '@angular/core';
import {ThreadoComposeComponent} from '../../features/threado-compose-component/threado-compose-component';
import {ThreadItemComponent} from '../../features/thread-item.component/thread-item.component';

@Component({
  selector: 'app-home-page',
  imports: [
    ThreadoComposeComponent,
    ThreadItemComponent
  ],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.css',
})
export class HomePageComponent {}
