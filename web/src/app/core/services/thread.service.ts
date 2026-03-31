import {inject, Injectable} from '@angular/core';
import {ThreadResponse} from '../model/thread/thread-response';
import {firstValueFrom, Observable} from "rxjs";
import {HttpBackend, HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../model/page';
import {MediaService} from './media-service';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private readonly http = inject(HttpClient);
  private readonly mediaService = inject(MediaService);
  private readonly apiUrl = '/api/threads';

  async createThread(text: string, file: File | null): Promise<ThreadResponse> {
    let mediaArray: any[] = [];

    if (file) {
      const mediaMetadata = await this.mediaService.uploadMediaWithMetadata(file);

      mediaArray = [{
        url: mediaMetadata.url,
        type: mediaMetadata.type,
        width: mediaMetadata.width,
        height: mediaMetadata.height,
        altText: 'Obraz dodany przez użytkownika'
      }];
    }

    const requestPayload = {
      content: text,
      media: mediaArray
    };

    return await firstValueFrom(this.http.post<ThreadResponse>(this.apiUrl, requestPayload));
  }

  repostThread(threadId: string, content?: string): Observable<ThreadResponse> {
    const body = content ? { content } : {};
    return this.http.post<ThreadResponse>(`${this.apiUrl}/${threadId}/repost`, body);
  }
}
