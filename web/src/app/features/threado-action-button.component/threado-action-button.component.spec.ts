import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadoActionButtonComponent } from './threado-action-button.component';

describe('ThreadoActionButtonComponent', () => {
  let component: ThreadoActionButtonComponent;
  let fixture: ComponentFixture<ThreadoActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadoActionButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadoActionButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
