import { Component, effect, ElementRef, HostListener, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { BookmarkIcon, HeartIcon, LucideAngularModule, MessageCircleIcon, RepeatIcon, ShareIcon } from 'lucide-angular';
import { ThreadoAvatarComponent } from '../threado-avatar-component/threado-avatar-component';
import { ThreadoActionButtonComponent } from '../threado-action-button.component/threado-action-button.component';
import { ThreadResponse } from '../../core/model/thread/thread-response';
import { LinkifyPipe } from '../../core/pipes/linkify-pipe';
import { RouterLink } from '@angular/router';
import { InteractionService } from '../../core/services/interaction.service';
import { FeedCacheService } from '../../core/services/feed-cache-service';
import { ToastService } from '../../core/services/toast-service';
import { ThreadService } from '../../core/services/thread.service';
import { QuotedThreadComponent } from '../quoted-thread.component/quoted-thread.component';
import { RelativeTimePipe } from '../../core/pipes/relative-time-pipe';
import {DatePipe, NgClass} from '@angular/common';
import { ThreadoModalComponent } from '../threado-modal-component/threado-modal-component';
import { ThreadoComposeComponent } from '../threado-compose-component/threado-compose-component';
import { lastValueFrom } from 'rxjs'; // DODANY IMPORT

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [
    LucideAngularModule,
    ThreadoAvatarComponent,
    ThreadoActionButtonComponent,
    LinkifyPipe,
    RouterLink,
    QuotedThreadComponent,
    RelativeTimePipe,
    DatePipe,
    ThreadoModalComponent,
    ThreadoComposeComponent,
    NgClass
  ],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.css',
})
export class ThreadComponent implements OnInit, OnDestroy {
  protected readonly RepeatIcon = RepeatIcon;
  protected readonly HeartIcon = HeartIcon;
  protected readonly ShareIcon = ShareIcon;
  protected readonly BookmarkIcon = BookmarkIcon;
  protected readonly MessageCircleIcon = MessageCircleIcon;

  private interactionService = inject(InteractionService);
  private feedCache = inject(FeedCacheService);
  private threadService = inject(ThreadService);
  private toast = inject(ToastService);
  private elementRef = inject(ElementRef);

  threadInput = input.required<ThreadResponse>({ alias: 'thread' });

  localMetrics = signal({ likeCount: 0, bookmarkCount: 0, repostCount: 0 });
  localInteractions = signal({ isLiked: false, isBookmarked: false, isReposted: false });

  isExpanded = signal(false);
  maxLength = 200;

  isRepostMenuOpen = signal(false);
  isQuoteModalOpen = signal(false);

  constructor() {
    effect(() => {
      const t = this.threadInput();
      this.localMetrics.set({
        likeCount: t.publicMetrics?.likeCount || 0,
        bookmarkCount: t.publicMetrics?.bookmarkCount || 0,
        repostCount: (t.publicMetrics?.repostCount + t.publicMetrics?.replyCount || 0)
      });
      this.localInteractions.set({
        isLiked: t.interactions?.isLiked || false,
        isBookmarked: t.interactions?.isBookmarked || false,
        isReposted: t.interactions?.isReposted || false
      });
    }, { allowSignalWrites: true });
  }

  ngOnInit() {
    document.addEventListener('click', this.onGlobalClick, true);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onGlobalClick, true);
  }

  toggleText(event: Event) {
    event.stopPropagation();
    this.isExpanded.update(val => !val);
  }

  toggleRepostMenu(event: Event) {
    event.stopPropagation();
    this.isRepostMenuOpen.update(val => !val);
  }

  async doPureRepost(event: Event) {
    event.stopPropagation();
    this.isRepostMenuOpen.set(false);

    const t = this.threadInput();
    const currentReposted = this.localInteractions().isReposted;

    const isNowReposted = !currentReposted;
    const metricChange = isNowReposted ? 1 : -1;

    this.localInteractions.update(state => ({ ...state, isReposted: isNowReposted }));
    this.localMetrics.update(state => ({
      ...state,
      repostCount: state.repostCount + metricChange
    }));

    try {
      await lastValueFrom(this.threadService.repostThread(t.id));

      if (isNowReposted) {
        this.toast.success('Podano dalej!');
      } else {
        this.toast.info('Cofnięto podanie dalej.');
      }
    } catch (error) {
      this.localInteractions.update(state => ({ ...state, isReposted: currentReposted }));
      this.localMetrics.update(state => ({ ...state, repostCount: state.repostCount - metricChange }));
      this.toast.error('Wystąpił błąd. Spróbuj ponownie.');
    }
  }

  openQuoteModal(event: Event) {
    event.stopPropagation();
    this.isRepostMenuOpen.set(false);
    this.isQuoteModalOpen.set(true);
  }

  onQuoteCreated(newThread: ThreadResponse) {
    this.isQuoteModalOpen.set(false);
    this.localMetrics.update(state => ({ ...state, repostCount: state.repostCount + 1 }));
  }

  onToggleLike(event: Event) {
    event.stopPropagation();
    const t = this.threadInput();
    const currentLiked = this.localInteractions().isLiked;

    this.localInteractions.update(state => ({ ...state, isLiked: !currentLiked }));
    this.localMetrics.update(state => ({
      ...state,
      likeCount: state.likeCount + (currentLiked ? -1 : 1)
    }));

    this.interactionService.toggleLike(t.id).subscribe({
      error: () => {
        this.localInteractions.update(state => ({ ...state, isLiked: currentLiked }));
        this.localMetrics.update(state => ({
          ...state,
          likeCount: state.likeCount + (currentLiked ? 1 : -1)
        }));
      }
    });
  }

  onToggleBookmark(event: Event) {
    event.stopPropagation();
    const t = this.threadInput();
    const currentBookmarked = this.localInteractions().isBookmarked;

    this.localInteractions.update(state => ({ ...state, isBookmarked: !currentBookmarked }));
    this.localMetrics.update(state => ({
      ...state,
      bookmarkCount: state.bookmarkCount + (currentBookmarked ? -1 : 1)
    }));

    this.interactionService.toggleBookmark(t.id).subscribe({
      next: () => {
        this.feedCache.clear('user-bookmarks-feed');
      },
      error: () => {
        this.localInteractions.update(state => ({ ...state, isBookmarked: currentBookmarked }));
        this.localMetrics.update(state => ({
          ...state,
          bookmarkCount: state.bookmarkCount + (currentBookmarked ? 1 : -1)
        }));
      }
    });
  }

  onGlobalClick = (event: Event) => {
    if (this.isRepostMenuOpen()) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);

      if (!clickedInside) {
        this.isRepostMenuOpen.set(false);
      }
    }
  };
}
