import {SettingsPageComponent} from './settings-page-component';
import {Routes} from '@angular/router';
import {ProfileEditComponent} from './profile-edit.component/profile-edit.component';

export const settingsRoutes: Routes = [
  { path: 'settings', component: SettingsPageComponent },
  { path: 'settings/profile', component: ProfileEditComponent },
];
