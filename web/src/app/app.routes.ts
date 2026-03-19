import { Routes } from '@angular/router';
import {HomePageComponent} from './shared/home-page-component/home-page-component';
import {NotificationsPageComponent} from './shared/notifications-page.component/notifications-page.component';
import {UserProfilePageComponent} from './shared/user-profile-page.component/user-profile-page.component';
import {BookmarksPageComponent} from './shared/bookmarks-page.component/bookmarks-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
    title: 'Główna / Threado'
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Główna / Threado'
  },
  {
    path: 'notifications',
    component: NotificationsPageComponent,
    title: 'Główna / Threado'
  },
  {
    path: 'bookmarks',
    component: BookmarksPageComponent,
    title: 'Główna / Threado'
  },
  {
    path: ':username',
    component: UserProfilePageComponent,
    title: 'Profil / Threado'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
