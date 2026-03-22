import {inject, Injectable} from '@angular/core';
import { MediaUploadResult } from "../model/media-upload-result";
import { HttpBackend, HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  private readonly http = inject(HttpClient);
  private readonly httpBackend = inject(HttpBackend);
  private readonly pureHttp = new HttpClient(this.httpBackend);

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
        `/api/media/upload-url?fileName=${file.name}&contentType=${file.type}`
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
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.src = URL.createObjectURL(file);
    });
  }
}
