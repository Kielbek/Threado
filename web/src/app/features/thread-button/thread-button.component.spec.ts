import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadButtonComponent } from './thread-button.component';

describe('ThreadButton', () => {
  let component: ThreadButtonComponent;
  let fixture: ComponentFixture<ThreadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
