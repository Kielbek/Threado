import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  untracked,
  viewChild
} from '@angular/core';
import { finalize, Observable } from "rxjs";
import { Page } from "../../core/model/page";
import {ThreadSkeletonComponent} from '../thread-skeleton.component/thread-skeleton.component';
import {ThreadComponent} from '../thread.component/thread.component';
import {EmptyStateComponent} from '../empty-state.component/empty-state.component';
import {AlertTriangleIcon} from 'lucide-angular';
import {FeedCacheService} from '../../core/services/feed-cache-service';

@Component({
  selector: 'app-thread-feed',
  imports: [
    ThreadSkeletonComponent,
    ThreadComponent,
    EmptyStateComponent
  ],
  templateUrl: './thread-feed.component.html',
  styleUrl: './thread-feed.component.css',
})
export class ThreadFeedComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private readonly feedCache = inject(FeedCacheService);

  readonly fetchStrategy = input.required<(page: number, size: number) => Observable<Page<any>>>();
  readonly cacheKey = input.required<string>();
  readonly emptyTitle = input<string>('');
  readonly emptyDescription = input<string>('');
  readonly emptyIcon = input<any>(null);

  readonly scrollAnchor = viewChild<ElementRef>('scrollAnchor');

  threads = signal<any[]>([]);
  currentPage = signal(0);
  isLoading = signal(false);
  isLastPage = signal(false);
  isError = signal(false);

  readonly pageSize = 10;
  private observer: IntersectionObserver | null = null;

  constructor() {
    effect(() => {
      const currentKey = this.cacheKey();
      const currentStrategy = this.fetchStrategy();

      untracked(() => {
        this.initializeFeed(currentKey);
      });
    });

    this.destroyRef.onDestroy(() => {
      this.observer?.disconnect();
    });
  }

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  private resetFeed() {
    this.threads.set([]);
    this.currentPage.set(0);
    this.isLastPage.set(false);
    this.isError.set(false);
    this.loadMore();
  }

  private initializeFeed(key: string) {
    if (this.feedCache.has(key)) {
      const cached = this.feedCache.get<any>(key)!;
      this.threads.set(cached.items);
      this.currentPage.set(cached.currentPage);
      this.isLastPage.set(cached.isLastPage);
      this.isError.set(false);
    } else {
      this.threads.set([]);
      this.currentPage.set(0);
      this.isLastPage.set(false);
      this.isError.set(false);
      this.loadMore();
    }
  }

  loadMore() {
    if (this.isLoading() || this.isLastPage() || this.isError()) return;

    this.isLoading.set(true);
    this.isError.set(false);

    this.fetchStrategy()(this.currentPage(), this.pageSize)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.threads.update(current => [...current, ...response.content]);
          this.isLastPage.set(response.isLast);
          this.currentPage.update(page => page + 1);

          this.syncCache();
        },
        error: (err) => {
          console.error('Failed to load threads', err);
          this.isError.set(true);
        }
      });
  }

  addThreadToTop(thread: any) {
    this.threads.update(current => [thread, ...current]);
    this.syncCache();
  }

  private syncCache() {
    this.feedCache.save(this.cacheKey(), {
      items: this.threads(),
      currentPage: this.currentPage(),
      isLastPage: this.isLastPage()
    });
  }

  private setupIntersectionObserver() {
    const anchorElement = this.scrollAnchor()?.nativeElement;
    if (!anchorElement) return;

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.loadMore();
      }
    }, {rootMargin: '200px'});

    this.observer.observe(anchorElement);
  }

  retry() {
    this.isError.set(false);
    this.loadMore();
  }

  protected readonly AlertTriangleIcon = AlertTriangleIcon;
}
