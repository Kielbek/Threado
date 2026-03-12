import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadoComposeComponent } from './threado-compose-component';

describe('ThreadoComposeComponent', () => {
  let component: ThreadoComposeComponent;
  let fixture: ComponentFixture<ThreadoComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadoComposeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadoComposeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
