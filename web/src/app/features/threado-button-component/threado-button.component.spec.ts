import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadoButtonComponent } from './threado-button.component';

describe('ThreadButton', () => {
  let component: ThreadoButtonComponent;
  let fixture: ComponentFixture<ThreadoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadoButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadoButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
