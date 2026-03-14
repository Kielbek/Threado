import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTabsComponent } from './feed-tabs.component';

describe('FeedTabsComponent', () => {
  let component: FeedTabsComponent;
  let fixture: ComponentFixture<FeedTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedTabsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
