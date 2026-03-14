import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadItemComponent } from './thread-item.component';

describe('ThreadItemComponent', () => {
  let component: ThreadItemComponent;
  let fixture: ComponentFixture<ThreadItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
