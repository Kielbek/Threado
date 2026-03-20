import {inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  private http = inject(HttpClient);
  private apiUrl = '/api/interactions';

  toggleLike(threadId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/threads/${threadId}/like`, {});
  }

  toggleBookmark(threadId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/threads/${threadId}/bookmark`, {});
  }
}
