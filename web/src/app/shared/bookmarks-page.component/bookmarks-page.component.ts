import {Component, inject, signal} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {PageHeaderComponent} from '../../features/page-header.component/page-header.component';
import {ThreadFeedComponent} from '../../features/thread-feed.component/thread-feed.component';
import {FeedService} from '../../core/services/feed-service';
import {Observable} from 'rxjs';
import {Page} from '../../core/model/page';
import {ThreadResponse} from '../../core/model/thread/thread-response';

export interface BookmarkedPost {
  id: string;
  user: { name: string; username: string; avatarUrl: string };
  content: string;
  timeAgo: string;
  stats: { replies: number; reposts: number; likes: number; views: number };
  isLiked: boolean;
}

@Component({
  selector: 'app-bookmarks-page.component',
  imports: [
    LucideAngularModule,
    PageHeaderComponent,
    ThreadFeedComponent
  ],
  templateUrl: './bookmarks-page.component.html',
  styleUrl: './bookmarks-page.component.css',
})
export class BookmarksPageComponent {
  private feedService = inject(FeedService);

  readonly cacheKey = 'user-bookmarks-feed';

  bookmarksFetcher = (page: number, size: number): Observable<Page<ThreadResponse>> => {
    return this.feedService.getBookmarkedThreads(page, size);
  };
}
