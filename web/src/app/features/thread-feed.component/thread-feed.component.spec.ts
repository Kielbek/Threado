import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadFeedComponent } from './thread-feed.component';

describe('ThreadFeedComponent', () => {
  let component: ThreadFeedComponent;
  let fixture: ComponentFixture<ThreadFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadFeedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadFeedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
