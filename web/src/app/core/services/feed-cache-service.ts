import { Injectable } from '@angular/core';

export interface FeedState<T = any> {
  items: T[];
  currentPage: number;
  isLastPage: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FeedCacheService {
  private cache = new Map<string, FeedState>();

  save<T>(key: string, state: FeedState<T>): void {
    this.cache.set(key, state);
  }

  get<T>(key: string): FeedState<T> | undefined {
    return this.cache.get(key) as FeedState<T> | undefined;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(key: string): void {
    this.cache.delete(key);
  }

  clearAll(): void {
    this.cache.clear();
  }
}
