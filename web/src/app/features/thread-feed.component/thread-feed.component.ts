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

  readonly fetchStrategy = input.required<(page: number, size: number) => Observable<Page<any>>>();
  emptyTitle = input<string>('');
  emptyDescription = input<string>('');
  emptyIcon = input<any>(null);

  readonly scrollAnchor = viewChild<ElementRef>('scrollAnchor');

  threads = signal<any[]>([]);
  currentPage = signal(0);
  readonly pageSize = 10;

  isLoading = signal(false);
  isLastPage = signal(false);
  isError = signal(false);

  private observer: IntersectionObserver | null = null;

  constructor() {
    effect(() => {
      this.fetchStrategy();
      untracked(() => this.resetFeed());
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

  loadMore() {
    if (this.isLoading() || this.isLastPage() || this.isError()) return;

    this.isLoading.set(true);
    this.isError.set(false);

    this.fetchStrategy()(this.currentPage(), this.pageSize)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => {
          console.log(response)
          this.threads.update(current => [...current, ...response.content]);
          this.isLastPage.set(response.isLast);
          this.currentPage.update(page => page + 1);
        },
        error: (err) => {
          this.isError.set(true);
        }
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
