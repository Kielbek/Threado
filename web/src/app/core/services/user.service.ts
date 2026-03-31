import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserProfile } from '../model/user-profile';
import { UserProfileUpdateRequest } from '../model/user-profile-update-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = '/api/users'

  private readonly currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public readonly currentUser$: Observable<UserProfile | null> = this.currentUserSubject.asObservable();

  public fetchCurrentUser(): Observable<UserProfile | null> {
    return this.http.get<UserProfile>(`${this.apiUrl}/me`).pipe(
      tap((user: UserProfile) => {
        this.currentUserSubject.next(user);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to fetch current user', error);
        this.currentUserSubject.next(null);
        return of(null);
      })
    );
  }

  getPublicProfile(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/public/${username}`);
  }

  updateProfile(request: UserProfileUpdateRequest): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/me`, request).pipe(
      tap((updatedUser: UserProfile) => {
        this.currentUserSubject.next(updatedUser);
      })
    );
  }

  followUser(userId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/follow`, {});
  }

  unfollowUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/unfollow`);
  }

  public clearUserState(): void {
    this.currentUserSubject.next(null);
  }

  public getCurrentUserSnapshot(): UserProfile | null {
    return this.currentUserSubject.value;
  }
}
