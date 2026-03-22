import { Component, inject, OnInit, signal } from '@angular/core';
import { CameraIcon, LucideAngularModule } from 'lucide-angular';
import { ThreadoAvatarComponent } from '../../../features/threado-avatar-component/threado-avatar-component';
import { PageHeaderComponent } from '../../../features/page-header.component/page-header.component';
import { ThreadoInputComponent } from '../../../features/threado-input.component/threado-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {DragDropService} from '../../../core/services/drag-drop-service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    LucideAngularModule,
    ThreadoAvatarComponent,
    PageHeaderComponent,
    ThreadoInputComponent,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  public dragService = inject(DragDropService);

  readonly CameraIcon = CameraIcon;
  profileForm!: FormGroup;

  coverPreview = signal<string | null>(null);
  avatarPreview = signal<string | null>(null);

  coverFileToUpload: File | null = null;
  avatarFileToUpload: File | null = null;

  isDraggingOverCover = signal(false);
  isDraggingOverAvatar = signal(false);

  ngOnInit() {
    this.profileForm = this.fb.nonNullable.group({
      name: ['Mateusz', [Validators.required, Validators.maxLength(50)]],
      bio: ['Add your bio', [Validators.maxLength(160)]],
      website: ['', [Validators.pattern('https?://.+')]]
    });
  }

  onCoverSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.coverFileToUpload = file;
      this.previewImage(file, this.coverPreview);
      input.value = '';
    }
  }

  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.avatarFileToUpload = file;
      this.previewImage(file, this.avatarPreview);
      input.value = '';
    }
  }

  onCoverDragEnter(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOverCover.set(true);
  }

  onCoverDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOverCover.set(false);
  }

  onCoverDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOverCover.set(false);
    this.dragService.reset();

    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.coverFileToUpload = file;
      this.previewImage(file, this.coverPreview);
    }
  }

  onAvatarDragEnter(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOverAvatar.set(true);
  }

  onAvatarDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOverAvatar.set(false);
  }

  onAvatarDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOverAvatar.set(false);
    this.dragService.reset();

    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.avatarFileToUpload = file;
      this.previewImage(file, this.avatarPreview);
    }
  }

  private previewImage(file: File, targetSignal: any) {
    const reader = new FileReader();
    reader.onload = () => {
      targetSignal.set(reader.result as string);
      this.profileForm.markAsDirty();
    };
    reader.readAsDataURL(file);
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.getRawValue();
      console.log('Dane tekstowe:', formData);
      console.log('Nowy Avatar do wysłania:', this.avatarFileToUpload);
      console.log('Nowy Cover do wysłania:', this.coverFileToUpload);

      // this.apiService.updateProfile(formData, this.avatarFileToUpload, this.coverFileToUpload)
    }
  }
}
