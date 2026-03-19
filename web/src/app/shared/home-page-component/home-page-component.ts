import {Component, inject} from '@angular/core';
import {ThreadoComposeComponent} from '../../features/threado-compose-component/threado-compose-component';
import {FeedTabsComponent} from '../../features/feed-tabs.component/feed-tabs.component';
import {PageHeaderComponent} from '../../features/page-header.component/page-header.component';
import {ThreadService} from '../../core/services/thread.service';
import {ThreadFeedComponent} from '../../features/thread-feed.component/thread-feed.component';

@Component({
  selector: 'app-home-page',
  imports: [
    ThreadoComposeComponent,
    FeedTabsComponent,
    PageHeaderComponent,
    ThreadFeedComponent
  ],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.css',
})
export class HomePageComponent {
  private readonly threadService = inject(ThreadService);

  globalFeedFetcher = (page: number, size: number) => {
    return this.threadService.getGlobalTimeline(page, size);
  };
}
