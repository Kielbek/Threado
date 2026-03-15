import { Component } from '@angular/core';
import {ThreadoComposeComponent} from '../../features/threado-compose-component/threado-compose-component';
import {ThreadItemComponent} from '../../features/thread-item.component/thread-item.component';
import {FeedTabsComponent} from '../../features/feed-tabs.component/feed-tabs.component';
import {PageHeaderComponent} from '../../features/page-header.component/page-header.component';

@Component({
  selector: 'app-home-page',
  imports: [
    ThreadoComposeComponent,
    ThreadItemComponent,
    FeedTabsComponent,
    PageHeaderComponent
  ],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.css',
})
export class HomePageComponent {}
