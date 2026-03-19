import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileHeaderComponent } from './user-profile-header.component';

describe('UserProfileHeaderComponent', () => {
  let component: UserProfileHeaderComponent;
  let fixture: ComponentFixture<UserProfileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
