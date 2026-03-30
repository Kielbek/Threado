import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotedThreadComponent } from './quoted-thread.component';

describe('QuotedThreadComponent', () => {
  let component: QuotedThreadComponent;
  let fixture: ComponentFixture<QuotedThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotedThreadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotedThreadComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
