import {Component, inject, OnInit, signal} from '@angular/core';
import {ThreadoComposeComponent} from '../../features/threado-compose-component/threado-compose-component';
import {ThreadItemComponent} from '../../features/thread-item.component/thread-item.component';
import {FeedTabsComponent} from '../../features/feed-tabs.component/feed-tabs.component';
import {PageHeaderComponent} from '../../features/page-header.component/page-header.component';
import {ThreadResponse} from '../../core/model/thread/thread-response';
import {ThreadService} from '../../core/services/thread.service';

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
export class HomePageComponent implements OnInit {
  private readonly threadService = inject(ThreadService);

  threads = signal<ThreadResponse[]>([]);
  isLoading = signal(false);

  ngOnInit() {
    this.loadTimeline();
  }

  loadTimeline() {
    this.isLoading.set(true);
    this.threadService.getGlobalTimeline(0, 10).subscribe({
      next: (res) => {
        this.threads.set(res.content);
        this.isLoading.set(false);
      },
      error: (err) => console.error('Failed to load timeline', err)
    });
  }
}
