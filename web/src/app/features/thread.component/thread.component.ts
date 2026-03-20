import { Component, input, signal, inject, effect, computed } from '@angular/core';
import { BookmarkIcon, HeartIcon, LucideAngularModule, MessageCircleIcon, RepeatIcon, ShareIcon } from 'lucide-angular';
import { ThreadoAvatarComponent } from '../threado-avatar-component/threado-avatar-component';
import { ThreadoActionButtonComponent } from '../threado-action-button.component/threado-action-button.component';
import { ThreadResponse } from '../../core/model/thread/thread-response';
import { LinkifyPipe } from '../../core/pipes/linkify-pipe';
import { RouterLink } from '@angular/router';
import { InteractionService } from '../../core/services/interaction.service'; // Pamiętaj o imporcie!

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [
    LucideAngularModule,
    ThreadoAvatarComponent,
    ThreadoActionButtonComponent,
    LinkifyPipe,
    RouterLink
  ],
  templateUrl: './thread.component.html',
  styleUrl: './thread.component.css',
})
export class ThreadComponent {
  protected readonly RepeatIcon = RepeatIcon;
  protected readonly HeartIcon = HeartIcon;
  protected readonly ShareIcon = ShareIcon;
  protected readonly BookmarkIcon = BookmarkIcon;
  protected readonly MessageCircleIcon = MessageCircleIcon;

  private interactionService = inject(InteractionService);

  threadInput = input.required<ThreadResponse>({ alias: 'thread' });

  localMetrics = signal({ likeCount: 0, bookmarkCount: 0 });
  localInteractions = signal({ isLiked: false, isBookmarked: false });

  isExpanded = signal(false);
  maxLength = 200;

  constructor() {
    effect(() => {
      const t = this.threadInput();
      this.localMetrics.set({
        likeCount: t.publicMetrics?.likeCount || 0,
        bookmarkCount: t.publicMetrics?.bookmarkCount || 0
      });
      this.localInteractions.set({
        isLiked: t.userInteractions?.isLiked || false,
        isBookmarked: t.userInteractions?.isBookmarked || false
      });
    }, { allowSignalWrites: true });
  }

  toggleText(event: Event) {
    event.stopPropagation();
    this.isExpanded.update(val => !val);
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
      error: () => {
        this.localInteractions.update(state => ({ ...state, isBookmarked: currentBookmarked }));
        this.localMetrics.update(state => ({
          ...state,
          bookmarkCount: state.bookmarkCount + (currentBookmarked ? 1 : -1)
        }));
      }
    });
  }
}
