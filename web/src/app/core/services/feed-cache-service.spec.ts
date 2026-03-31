import { TestBed } from '@angular/core/testing';

import { FeedCacheService } from './feed-cache-service';

describe('FeedCacheService', () => {
  let service: FeedCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
