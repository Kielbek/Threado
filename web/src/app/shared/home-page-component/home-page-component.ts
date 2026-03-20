import {Component, computed, inject, signal} from '@angular/core';
import {ThreadoComposeComponent} from '../../features/threado-compose-component/threado-compose-component';
import {FeedTabsComponent, FeedTabType} from '../../features/feed-tabs.component/feed-tabs.component';
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

  currentTab = signal<FeedTabType>('For You');

  readonly currentCacheKey = computed(() =>
    `home-${this.currentTab() === 'For You' ? 'global' : 'following'}-timeline`
  );

  readonly emptyTitle = computed(() =>
    this.currentTab() === 'For You' ? 'Witaj na Threado!' : 'Nic tu jeszcze nie ma'
  );

  readonly currentStrategy = computed(() => {
    return this.currentTab() === 'For You'
      ? (page: number, size: number) => this.threadService.getGlobalTimeline(page, size)
      : (page: number, size: number) => this.threadService.getGlobalTimeline(page, size);
      // : (page: number, size: number) => this.threadService.getFollowingTimeline(page, size);
  });

}
