import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadSkeletonComponent } from './thread-skeleton.component';

describe('ThreadSkeletonComponent', () => {
  let component: ThreadSkeletonComponent;
  let fixture: ComponentFixture<ThreadSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadSkeletonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
