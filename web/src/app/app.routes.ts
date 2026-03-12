import { Routes } from '@angular/router';
import {HomePageComponent} from './shared/home-page-component/home-page-component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Główna / Threado'
  },

  {
    path: '**',
    redirectTo: ''
  }
];
