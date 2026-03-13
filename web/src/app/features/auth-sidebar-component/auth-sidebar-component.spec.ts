import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSidebarComponent } from './auth-sidebar-component';

describe('AuthSidebarComponent', () => {
  let component: AuthSidebarComponent;
  let fixture: ComponentFixture<AuthSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthSidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
