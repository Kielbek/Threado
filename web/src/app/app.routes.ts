import {Routes} from '@angular/router';
import {HomePageComponent} from './shared/home-page-component/home-page-component';
import {NotificationsPageComponent} from './shared/notifications-page.component/notifications-page.component';
import {UserProfilePageComponent} from './shared/user-profile-page.component/user-profile-page.component';
import {BookmarksPageComponent} from './shared/bookmarks-page.component/bookmarks-page.component';
import {SettingsPageComponent} from "./shared/settings-page-component/settings-page-component";
import {ProfileEditComponent} from './shared/settings-page-component/profile-edit.component/profile-edit.component';
import {
  PreferencesPageComponent
} from './shared/settings-page-component/preferences-page.component/preferences-page.component';
import {AccountPageComponent} from './shared/settings-page-component/account-page.component/account-page.component';
import { authGuard } from "./core/guard/auth-guard";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
    title: 'Główna / Threado',
    canActivate: [authGuard]
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Główna / Threado',
    canActivate: [authGuard]
  },
  {
    path: 'notifications',
    component: NotificationsPageComponent,
    title: 'Powiadomienia / Threado',
    canActivate: [authGuard]
  },
  {
    path: 'bookmarks',
    component: BookmarksPageComponent,
    title: 'Zakładki / Threado',
    canActivate: [authGuard]
  },
  { path: 'settings', component: SettingsPageComponent, canActivate: [authGuard] },
  { path: 'settings/profile', component: ProfileEditComponent, canActivate: [authGuard] },
  { path: 'settings/account', component: AccountPageComponent, canActivate: [authGuard] },
  { path: 'settings/preferences', component: PreferencesPageComponent, canActivate: [authGuard] },

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
