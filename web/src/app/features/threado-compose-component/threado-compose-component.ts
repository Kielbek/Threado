import { Component, computed, ElementRef, HostListener, inject, signal } from '@angular/core';
import { LucideAngularModule, PaperclipIcon, SmileIcon, XIcon } from 'lucide-angular';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThreadoButtonComponent } from '../threado-button-component/threado-button.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ThreadoAvatarComponent } from '../threado-avatar-component/threado-avatar-component';

@Component({
  selector: 'app-threado-compose',
  imports: [
    LucideAngularModule,
    NgClass,
    FormsModule,
    ThreadoButtonComponent,
    PickerComponent,
    ThreadoAvatarComponent
  ],
  templateUrl: './threado-compose-component.html',
  styleUrl: './threado-compose-component.css',
})
export class ThreadoComposeComponent {
  private elementRef = inject(ElementRef);

  readonly MAX_CHARS = 3000;
  readonly CIRCUMFERENCE = 50.26;

  content = signal('');
  isExpanded = signal(false);
  selectedImage = signal<string | null>(null);

  isEmojiPickerVisible: boolean = false;

  isDraggingAnywhere: boolean = false;
  isDraggingOverComponent: boolean = false;
  private documentDragCounter: number = 0;

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

  @HostListener('document:dragenter', ['$event'])
  onDocumentDragEnter(event: DragEvent) {
    if (event.dataTransfer?.types.includes('Files')) {
      event.preventDefault();
      this.documentDragCounter++;
      this.isDraggingAnywhere = true;
    }
  }

  @HostListener('document:dragleave', ['$event'])
  onDocumentDragLeave(event: DragEvent) {
    if (event.dataTransfer?.types.includes('Files')) {
      event.preventDefault();
      this.documentDragCounter--;

      if (this.documentDragCounter === 0) {
        this.isDraggingAnywhere = false;
        this.isDraggingOverComponent = false;
      }
    }
  }

  @HostListener('document:dragover', ['$event'])
  onDocumentDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('document:drop', ['$event'])
  onDocumentDrop(event: DragEvent) {
    event.preventDefault();
    this.resetDragState();
  }

  onComponentDragEnter(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOverComponent = true;
    this.isExpanded.set(true);
  }

  onComponentDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOverComponent = false;
    this.isExpanded.set(false);
  }

  onComponentDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.resetDragState();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const droppedFile = files[0];

      if (droppedFile.type.startsWith('image/')) {
        this.handleFile(droppedFile);
        this.expandForm();
      }
    }
  }

  private resetDragState() {
    this.documentDragCounter = 0;
    this.isDraggingAnywhere = false;
    this.isDraggingOverComponent = false;
  }

  expandForm() {
    this.isExpanded.set(true);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.selectedImage.set(null);
  }

  toggleEmojiPicker(event: MouseEvent) {
    event.stopPropagation();
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }

  addEmoji(event: any) {
    this.content.update(current => current + event.emoji.native);
    this.isEmojiPickerVisible = false;
  }

  submitPost() {
    if ((this.characterCount() === 0 && !this.selectedImage()) || this.isOverLimit()) {
      return;
    }

    // TODO: Tutaj w przyszłości dodasz wywołanie serwisu zapisującego do bazy/Keycloaka

    this.content.set('');
    this.selectedImage.set(null);
    this.isExpanded.set(false);
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

  protected readonly XIcon = XIcon;
  protected readonly SmileIcon = SmileIcon;
  protected readonly PaperclipIcon = PaperclipIcon;
}
