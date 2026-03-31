import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileNotFoundComponent } from './user-profile-not-found.component';

describe('UserProfileNotFoundComponent', () => {
  let component: UserProfileNotFoundComponent;
  let fixture: ComponentFixture<UserProfileNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileNotFoundComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
