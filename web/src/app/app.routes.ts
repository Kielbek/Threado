import { Routes } from '@angular/router';
import {HomePageComponent} from './shared/home-page-component/home-page-component';
import {NotificationsPageComponent} from './shared/notifications-page.component/notifications-page.component';
import {UserProfilePageComponent} from './shared/user-profile-page-component/user-profile-page-component';
import {BookmarksPageComponent} from './shared/bookmarks-page.component/bookmarks-page.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Główna / Threado'
  },
  {
    path: 'user/:username',
    component: UserProfilePageComponent,
    title: 'Profil / Threado'
  },
  {
    path: 'profile/:username',
    component: UserProfilePageComponent,
    title: 'Profil / Threado'
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
    path: '**',
    redirectTo: ''
  }
];
