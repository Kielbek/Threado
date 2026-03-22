import {inject, Injectable} from '@angular/core';
import {ThreadResponse} from '../model/thread/thread-response';
import {firstValueFrom, Observable} from "rxjs";
import {HttpBackend, HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../model/page';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private readonly http = inject(HttpClient);
  private readonly httpBackend = inject(HttpBackend);
  private readonly pureHttp = new HttpClient(this.httpBackend);
  private readonly apiUrl = '/api/threads';

  private getImageDimensions(file: File): Promise<{width: number, height: number}> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.src = URL.createObjectURL(file);
    });
  }

  async createThread(text: string, file: File | null): Promise<ThreadResponse> {
    let mediaArray: any[] = [];

    if (file) {
      const dimensions = await this.getImageDimensions(file);

      const { presignedUrl, fileAccessUrl } = await firstValueFrom(
        this.http.get<{presignedUrl: string, fileAccessUrl: string}>(
          `/api/media/upload-url?fileName=${file.name}&contentType=${file.type}`
        )
      );

      await firstValueFrom(
        this.pureHttp.put(presignedUrl, file)
      );

      mediaArray = [{
        url: fileAccessUrl,
        type: file.type.startsWith('video') ? 'VIDEO' : 'IMAGE',
        width: dimensions.width,
        height: dimensions.height,
        altText: 'Obraz dodany przez użytkownika'
      }];
    }

    const requestPayload = {
      content: text,
      media: mediaArray
    };

    return await firstValueFrom(this.http.post<ThreadResponse>(this.apiUrl, requestPayload));
  }
}
