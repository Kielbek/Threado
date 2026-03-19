import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {UserProfile} from '../model/user-profile';

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
        this.currentUserSubject.next(null);

        return of(null);
      })
    );
  }

  getPublicProfile(username: string): Observable<any> {
    return this.http.get<any>(`/api/users/public/${username}`);
  }


  public clearUserState(): void {
    this.currentUserSubject.next(null);
  }


  public getCurrentUserSnapshot(): UserProfile | null {
    return this.currentUserSubject.value;
  }
}
