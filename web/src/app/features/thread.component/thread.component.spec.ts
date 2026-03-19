import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadComponent } from './thread.component';

describe('ThreadItemComponent', () => {
  let component: ThreadComponent;
  let fixture: ComponentFixture<ThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
