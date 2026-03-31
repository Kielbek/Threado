import { Component, computed, effect, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';
import { LucideAngularModule, PaperclipIcon, SmileIcon, XIcon } from 'lucide-angular';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThreadoButtonComponent } from '../threado-button-component/threado-button.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ThreadoAvatarComponent } from '../threado-avatar-component/threado-avatar-component';
import { ThreadoActionButtonComponent } from '../threado-action-button.component/threado-action-button.component';
import { UserService } from '../../core/services/user.service';
import { ThreadService } from '../../core/services/thread.service';
import { ThreadResponse } from '../../core/model/thread/thread-response';
import { DragDropService } from '../../core/services/drag-drop-service';
import { MediaService } from '../../core/services/media-service';
import { ToastService } from '../../core/services/toast-service';
import {QuotedThreadComponent} from '../quoted-thread.component/quoted-thread.component';
import {lastValueFrom} from 'rxjs';
import {FeedCacheService} from '../../core/services/feed-cache-service';

@Component({
  selector: 'app-threado-compose',
  standalone: true,
  imports: [
    LucideAngularModule,
    NgClass,
    FormsModule,
    ThreadoButtonComponent,
    PickerComponent,
    ThreadoAvatarComponent,
    ThreadoActionButtonComponent,
    AsyncPipe,
    QuotedThreadComponent
  ],
  templateUrl: './threado-compose-component.html',
  styleUrl: './threado-compose-component.css',
})
export class ThreadoComposeComponent {
  private elementRef = inject(ElementRef);
  public userService = inject(UserService);
  private threadService = inject(ThreadService);
  public dragService = inject(DragDropService);
  private mediaService = inject(MediaService);
  private toast = inject(ToastService);
  private feedCache = inject(FeedCacheService);

  readonly MAX_CHARS = 3000;
  readonly CIRCUMFERENCE = 50.26;

  quoteThread = input<ThreadResponse | null>(null);

  threadCreated = output<ThreadResponse>();

  content = signal('');
  isExpanded = signal(false);
  isSubmitting = signal(false);

  selectedMediaPreview = signal<string | null>(null);
  selectedMediaType = signal<'image' | 'video' | null>(null);
  selectedFile = signal<File | null>(null);
  mediaError = signal<string | null>(null);

  isEmojiPickerVisible: boolean = false;
  isDraggingOverComponent: boolean = false;

  characterCount = computed(() => this.content().length);

  progressOffset = computed(() => {
    const progress = this.characterCount() / this.MAX_CHARS;
    const boundedProgress = Math.min(progress, 1);
    return this.CIRCUMFERENCE - (boundedProgress * this.CIRCUMFERENCE);
  });

  isNearLimit = computed(() => this.characterCount() >= this.MAX_CHARS - 200);
  isOverLimit = computed(() => this.characterCount() > this.MAX_CHARS);

  protected readonly XIcon = XIcon;
  protected readonly SmileIcon = SmileIcon;
  protected readonly PaperclipIcon = PaperclipIcon;

  constructor() {
    effect(() => {
      if (this.quoteThread()) {
        this.isExpanded.set(true);
      }
    }, { allowSignalWrites: true });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isExpanded()) return;

    if (this.quoteThread()) return;

    const clickedInsideComponent = this.elementRef.nativeElement.contains(event.target);
    const targetElement = event.target as HTMLElement;
    const clickedInsidePicker = !!targetElement.closest('emoji-mart');

    if (!clickedInsideComponent && !clickedInsidePicker) {
      this.isEmojiPickerVisible = false;
      if (this.selectedMediaPreview()) return;
      this.isExpanded.set(false);
    }
  }

  expandForm() { this.isExpanded.set(true); }

  onComponentDragEnter(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOverComponent = true;
    this.isExpanded.set(true);
  }

  onComponentDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOverComponent = false;
  }

  onComponentDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOverComponent = false;
    this.dragService.reset();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.type.startsWith('image/') || droppedFile.type.startsWith('video/')) {
        this.processFile(droppedFile);
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.processFile(input.files[0]);
      input.value = '';
    }
  }

  private async processFile(file: File) {
    this.mediaError.set(null);
    this.isSubmitting.set(true);
    try {
      const processedFile = await this.mediaService.processFile(file);
      const type = processedFile.type.startsWith('video/') ? 'video' : 'image';
      this.setMedia(processedFile, type);
    } catch (error: any) {
      this.mediaError.set(error.message || 'Wystąpił błąd podczas przetwarzania pliku.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private setMedia(file: File, type: 'image' | 'video') {
    this.removeMedia();
    this.selectedFile.set(file);
    this.selectedMediaType.set(type);
    this.selectedMediaPreview.set(URL.createObjectURL(file));
    this.expandForm();
  }

  removeMedia() {
    const currentPreview = this.selectedMediaPreview();
    if (currentPreview) {
      URL.revokeObjectURL(currentPreview);
    }
    this.selectedMediaPreview.set(null);
    this.selectedMediaType.set(null);
    this.selectedFile.set(null);
    this.mediaError.set(null);
  }

  toggleEmojiPicker(event: MouseEvent) {
    event.stopPropagation();
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }

  addEmoji(event: any) {
    this.content.update(current => current + event.emoji.native);
    this.isEmojiPickerVisible = false;
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    const maxHeight = 200;
    if (textarea.scrollHeight <= maxHeight) {
      textarea.style.height = textarea.scrollHeight + 'px';
      textarea.style.overflowY = 'hidden';
    } else {
      textarea.style.height = maxHeight + 'px';
      textarea.style.overflowY = 'scroll';
    }
  }

  async submitPost() {
    if ((this.characterCount() === 0 && !this.selectedFile()) || this.isOverLimit() || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    try {
      const quoteId = this.quoteThread()?.id;
      let newThread: ThreadResponse;
      const quote = this.quoteThread();

      if (quote) {
        newThread = await lastValueFrom(this.threadService.repostThread(quote.id, this.content()));
      } else {
        newThread = await this.threadService.createThread(this.content(), this.selectedFile());
      }

      this.feedCache.prependItem('home-global-timeline', newThread);
      this.toast.success(quoteId ? 'Zacytowano pomyślnie!' : 'Pomyślnie opublikowano Threada!');
      this.threadCreated.emit(newThread);
      this.content.set('');
      this.removeMedia();

      if (!this.quoteThread()) {
        this.isExpanded.set(false);
      }

    } catch (error) {
      this.toast.error('Nie udało się opublikować.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
