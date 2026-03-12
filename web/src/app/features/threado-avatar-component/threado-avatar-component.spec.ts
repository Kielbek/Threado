import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadoAvatarComponent } from './threado-avatar-component';

describe('ThreadoAvatarComponent', () => {
  let component: ThreadoAvatarComponent;
  let fixture: ComponentFixture<ThreadoAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadoAvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadoAvatarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
