import { Component, computed, ElementRef, HostListener, inject, output, signal } from '@angular/core';
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
import {DragDropService} from '../../core/services/drag-drop-service';

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
    AsyncPipe
  ],
  templateUrl: './threado-compose-component.html',
  styleUrl: './threado-compose-component.css',
})
export class ThreadoComposeComponent {
  private elementRef = inject(ElementRef);
  public userService = inject(UserService);
  private threadService = inject(ThreadService);

  public dragService = inject(DragDropService);

  readonly MAX_CHARS = 3000;
  readonly CIRCUMFERENCE = 50.26;

  threadCreated = output<ThreadResponse>();

  content = signal('');
  isExpanded = signal(false);
  selectedImage = signal<string | null>(null);
  selectedFile = signal<File | null>(null);
  isSubmitting = signal(false);

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isExpanded()) return;

    const clickedInsideComponent = this.elementRef.nativeElement.contains(event.target);
    const targetElement = event.target as HTMLElement;
    const clickedInsidePicker = !!targetElement.closest('emoji-mart');

    if (!clickedInsideComponent && !clickedInsidePicker) {
      this.isEmojiPickerVisible = false;
      if (this.selectedImage()) return;
      this.isExpanded.set(false);
    }
  }

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

      if (droppedFile.type.startsWith('image/')) {
        this.handleFile(droppedFile);
        this.expandForm();
      }
    }
  }

  expandForm() { this.isExpanded.set(true); }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File) {
    this.selectedFile.set(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.selectedImage.set(null);
    this.selectedFile.set(null);
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
    if ((this.characterCount() === 0 && !this.selectedImage()) || this.isOverLimit() || this.isSubmitting()) {
      return;
    }
    this.isSubmitting.set(true);
    try {
      const newThread = await this.threadService.createThread(this.content(), this.selectedFile());
      this.threadCreated.emit(newThread);
      this.content.set('');
      this.selectedImage.set(null);
      this.selectedFile.set(null);
      this.isExpanded.set(false);
    } catch (error) {
      console.error(error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  protected readonly XIcon = XIcon;
  protected readonly SmileIcon = SmileIcon;
  protected readonly PaperclipIcon = PaperclipIcon;
}
