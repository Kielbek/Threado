import { Component } from '@angular/core';
import {ThreadoComposeComponent} from '../../features/threado-compose-component/threado-compose-component';

@Component({
  selector: 'app-home-page',
  imports: [
    ThreadoComposeComponent
  ],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.css',
})
export class HomePageComponent {}
