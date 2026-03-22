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

  private readonly currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public readonly currentUser$: Observable<UserProfile | null> = this.currentUserSubject.asObservable();

  public fetchCurrentUser(): Observable<UserProfile | null> {
    return this.http.get<UserProfile>('/api/users/me').pipe(
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
    return this.http.get<UserProfile>(`/api/users/public/${username}`);
  }

  updateProfile(request: UserProfileUpdateRequest): Observable<UserProfile> {
    return this.http.put<UserProfile>('/api/users/me', request).pipe(
      tap((updatedUser: UserProfile) => {
        this.currentUserSubject.next(updatedUser);
      })
    );
  }

  public clearUserState(): void {
    this.currentUserSubject.next(null);
  }

  public getCurrentUserSnapshot(): UserProfile | null {
    return this.currentUserSubject.value;
  }
}
