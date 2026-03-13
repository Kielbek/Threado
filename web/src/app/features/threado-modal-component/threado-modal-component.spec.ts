import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadoModalComponent } from './threado-modal-component';

describe('ThreadoModalComponent', () => {
  let component: ThreadoModalComponent;
  let fixture: ComponentFixture<ThreadoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadoModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
