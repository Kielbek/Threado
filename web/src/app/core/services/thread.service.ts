import {inject, Injectable} from '@angular/core';
import {CreateThreadRequest} from '../model/thread/create-thread-request';
import {ThreadResponse} from '../model/thread/thread-response';
import { Observable } from "rxjs";
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../model/page';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/threads';

  createThread(request: CreateThreadRequest): Observable<ThreadResponse> {
    return this.http.post<ThreadResponse>(this.apiUrl, request);
  }

  getGlobalTimeline(page = 0, size = 10): Observable<Page<ThreadResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<ThreadResponse>>(`${this.apiUrl}/timeline`, { params });
  }

}
