import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadoInputComponent } from './threado-input.component';

describe('ThreadoInputComponent', () => {
  let component: ThreadoInputComponent;
  let fixture: ComponentFixture<ThreadoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadoInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadoInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
