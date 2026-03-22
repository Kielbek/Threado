import { Component, inject, OnInit, signal } from '@angular/core';
import { CameraIcon, LucideAngularModule } from 'lucide-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { ThreadoAvatarComponent } from '../../../features/threado-avatar-component/threado-avatar-component';
import { PageHeaderComponent } from '../../../features/page-header.component/page-header.component';
import { ThreadoInputComponent } from '../../../features/threado-input.component/threado-input.component';

import { DragDropService } from '../../../core/services/drag-drop-service';
import { MediaService } from '../../../core/services/media-service';
import {UserService} from '../../../core/services/user.service';

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
  private readonly fb = inject(FormBuilder);
  public readonly dragService = inject(DragDropService);
  private readonly mediaService = inject(MediaService);
  private readonly userService = inject(UserService);

  readonly CameraIcon = CameraIcon;
  profileForm!: FormGroup;

  coverPreview = signal<string | null>(null);
  avatarPreview = signal<string | null>(null);

  coverFileToUpload: File | null = null;
  avatarFileToUpload: File | null = null;

  currentAvatarUrl: string | null = null;
  currentCoverUrl: string | null = null;

  isDraggingOverCover = signal(false);
  isDraggingOverAvatar = signal(false);
  isLoading = signal(false);

  ngOnInit() {
    this.profileForm = this.fb.nonNullable.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      bio: ['', [Validators.maxLength(160)]],
      websiteUrl: ['', [Validators.pattern('https?://.+')]]
    });

    const currentUser = this.userService.getCurrentUserSnapshot();

    if (currentUser) {
      this.profileForm.patchValue({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        username: currentUser.username,
        bio: currentUser.bio || '',
        websiteUrl: currentUser.websiteUrl || ''
      });

      if (currentUser.avatarUrl) {
        this.avatarPreview.set(currentUser.avatarUrl);
        this.currentAvatarUrl = currentUser.avatarUrl;
      }

      if (currentUser.coverUrl) {
        this.coverPreview.set(currentUser.coverUrl);
        this.currentCoverUrl = currentUser.coverUrl;
      }
    }
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

  hasChanges(): boolean {
    const isFormDirty = this.profileForm.dirty;
    const hasNewAvatar = !!this.avatarFileToUpload;
    const hasNewCover = !!this.coverFileToUpload;

    return isFormDirty || hasNewAvatar || hasNewCover;
  }

  async saveProfile() {
    if (!this.hasChanges() || this.profileForm.invalid || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);

    try {
      const formData = this.profileForm.getRawValue();
      let avatarUrl = this.currentAvatarUrl;
      let coverUrl = this.currentCoverUrl;

      if (this.avatarFileToUpload) {
        avatarUrl = await this.mediaService.uploadBasicFile(this.avatarFileToUpload);
      }

      if (this.coverFileToUpload) {
        coverUrl = await this.mediaService.uploadBasicFile(this.coverFileToUpload);
      }

      const finalPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        bio: formData.bio,
        websiteUrl: formData.websiteUrl,
        avatarUrl: avatarUrl,
        coverUrl: coverUrl
      };

      await firstValueFrom(this.userService.updateProfile(finalPayload));

    } catch (error: any) {
      if (error.status === 409) {
        this.profileForm.get('username')?.setErrors({ usernameTaken: true });
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}
