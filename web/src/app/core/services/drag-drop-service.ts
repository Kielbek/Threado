import {DOCUMENT, Inject, Injectable, OnDestroy, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DragDropService implements OnDestroy {
  public isDraggingAnywhere = signal(false);
  private dragCounter = 0;

  private onDragEnter = this.handleDragEnter.bind(this);
  private onDragLeave = this.handleDragLeave.bind(this);
  private onDragOver = this.handleDragOver.bind(this);
  private onDrop = this.handleDrop.bind(this);

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.addEventListener('dragenter', this.onDragEnter);
    this.document.addEventListener('dragleave', this.onDragLeave);
    this.document.addEventListener('dragover', this.onDragOver);
    this.document.addEventListener('drop', this.onDrop);
  }

  ngOnDestroy() {
    this.document.removeEventListener('dragenter', this.onDragEnter);
    this.document.removeEventListener('dragleave', this.onDragLeave);
    this.document.removeEventListener('dragover', this.onDragOver);
    this.document.removeEventListener('drop', this.onDrop);
  }

  private handleDragEnter(event: DragEvent) {
    if (event.dataTransfer?.types.includes('Files')) {
      event.preventDefault();
      this.dragCounter++;
      this.isDraggingAnywhere.set(true);
    }
  }

  private handleDragLeave(event: DragEvent) {
    if (event.dataTransfer?.types.includes('Files')) {
      event.preventDefault();
      this.dragCounter--;
      if (this.dragCounter === 0) {
        this.isDraggingAnywhere.set(false);
      }
    }
  }

  private handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private handleDrop(event: DragEvent) {
    event.preventDefault();
    this.reset();
  }

  public reset() {
    this.dragCounter = 0;
    this.isDraggingAnywhere.set(false);
  }
}
