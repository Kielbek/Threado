import { Component } from '@angular/core';
import {PageHeaderComponent} from '../../../features/page-header.component/page-header.component';
import {ThreadoSelectorComponent} from '../../../features/threado-selector.component/threado-selector.component';

@Component({
  selector: 'app-preferences-page.component',
  imports: [
    PageHeaderComponent,
    ThreadoSelectorComponent
  ],
  templateUrl: './preferences-page.component.html',
  styleUrl: './preferences-page.component.css',
})
export class PreferencesPageComponent {}
