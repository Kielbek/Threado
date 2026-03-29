import { inject, Injectable } from '@angular/core';
import { MediaUploadResult } from '../model/media-upload-result';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import imageCompression from 'browser-image-compression';
import { ToastService } from "./toast-service";

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private readonly http = inject(HttpClient);
  private readonly httpBackend = inject(HttpBackend);
  private readonly pureHttp = new HttpClient(this.httpBackend);
  private readonly toast = inject(ToastService);

  public readonly MAX_VIDEO_DURATION_SEC = 60;
  public readonly MAX_VIDEO_SIZE_MB = 50;
  public readonly MAX_IMAGE_SIZE_MB = 20;

  async processFile(file: File): Promise<File> {
    if (file.type.startsWith('video/')) {
      return this.processVideo(file);
    } else if (file.type.startsWith('image/')) {
      return this.processImage(file);
    }

    const msg = 'Nieobsługiwany format pliku. Wybierz zdjęcie lub wideo.';
    this.toast.error(msg, 'Zły format');
    throw new Error(msg);
  }

  private async processVideo(file: File): Promise<File> {
    const fileSizeMB = file.size / 1024 / 1024;

    if (fileSizeMB > this.MAX_VIDEO_SIZE_MB) {
      const msg = `Plik wideo jest za duży (${fileSizeMB.toFixed(1)}MB). Maksymalny rozmiar to ${this.MAX_VIDEO_SIZE_MB}MB.`;
      this.toast.warning(msg, 'Wideo za duże');
      throw new Error(msg);
    }

    const duration = await this.getVideoDuration(file);
    if (duration > this.MAX_VIDEO_DURATION_SEC) {
      const msg = `Wideo nie może być dłuższe niż ${this.MAX_VIDEO_DURATION_SEC} sekund.`;
      this.toast.warning(msg, 'Wideo za długie');
      throw new Error(msg);
    }

    return file;
  }

  private async processImage(file: File): Promise<File> {
    const fileSizeMB = file.size / 1024 / 1024;

    if (fileSizeMB > this.MAX_IMAGE_SIZE_MB) {
      const msg = `Zdjęcie jest za duże (${fileSizeMB.toFixed(1)}MB). Maksymalny rozmiar to ${this.MAX_IMAGE_SIZE_MB}MB.`;
      this.toast.warning(msg, 'Zdjęcie za duże');
      throw new Error(msg);
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log(`[MediaService] Skompresowano z ${(file.size / 1024 / 1024).toFixed(2)}MB do ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
      return compressedFile;
    } catch (error) {
      // ZAMIAST CONSOLE ERROR UŻYWAMY TOASTA
      // Nie rzucamy wyjątku, żeby wysłał się chociaż oryginał pliku
      this.toast.error('Nie udało się skompresować zdjęcia. Spróbujemy wysłać oryginał.', 'Błąd kompresji');
      return file;
    }
  }

  private getVideoDuration(file: File): Promise<number> {
    return new Promise((resolve) => {
      const videoElement = document.createElement('video');
      videoElement.preload = 'metadata';

      videoElement.onloadedmetadata = () => {
        URL.revokeObjectURL(videoElement.src);
        resolve(videoElement.duration);
      };

      videoElement.onerror = () => {
        URL.revokeObjectURL(videoElement.src);
        resolve(Infinity);
      };

      videoElement.src = URL.createObjectURL(file);
    });
  }

  async uploadBasicFile(file: File): Promise<string> {
    const { presignedUrl, fileAccessUrl } = await this.getPresignedUrl(file);
    await this.uploadToS3(presignedUrl, file);
    return fileAccessUrl;
  }

  async uploadMediaWithMetadata(file: File): Promise<MediaUploadResult> {
    const isVideo = file.type.startsWith('video');
    let width, height;

    if (!isVideo) {
      const dimensions = await this.getImageDimensions(file);
      width = dimensions.width;
      height = dimensions.height;
    }

    const { presignedUrl, fileAccessUrl } = await this.getPresignedUrl(file);
    await this.uploadToS3(presignedUrl, file);

    return {
      url: fileAccessUrl,
      type: isVideo ? 'VIDEO' : 'IMAGE',
      width,
      height
    };
  }

  private async getPresignedUrl(file: File): Promise<{presignedUrl: string, fileAccessUrl: string}> {
    return await firstValueFrom(
      this.http.get<{presignedUrl: string, fileAccessUrl: string}>(
        `/api/media/upload-url?fileName=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`
      )
    );
  }

  private async uploadToS3(presignedUrl: string, file: File): Promise<void> {
    await firstValueFrom(
      this.pureHttp.put(presignedUrl, file, {
        headers: { 'Content-Type': file.type }
      })
    );
  }

  private getImageDimensions(file: File): Promise<{width: number, height: number}> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(img.src);
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  }
}
