import {HttpClient, HttpParams} from "@angular/common/http";
import {inject, Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Page } from "../model/page";
import { ThreadResponse } from "../model/thread/thread-response";

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly http = inject(HttpClient);
  private readonly feedApiUrl = '/api/feed';

  getGlobalTimeline(page = 0, size = 10): Observable<Page<ThreadResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<ThreadResponse>>(`${this.feedApiUrl}/timeline`, { params });
  }

  getUserThreads(authorId: string, page = 0, size = 10): Observable<Page<ThreadResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<ThreadResponse>>(`${this.feedApiUrl}/user/${authorId}`, { params });
  }

  getBookmarkedThreads(page = 0, size = 10): Observable<Page<ThreadResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<ThreadResponse>>(`${this.feedApiUrl}/bookmarks`, { params });
  }

  test(): Observable<string> {
    return this.http.get('http://localhost:8222/api/feed/test', { responseType: 'text' });
  }
}
