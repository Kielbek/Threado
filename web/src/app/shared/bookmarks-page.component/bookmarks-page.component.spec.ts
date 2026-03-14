import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksPageComponent } from './bookmarks-page.component';

describe('BookmarksPageComponent', () => {
  let component: BookmarksPageComponent;
  let fixture: ComponentFixture<BookmarksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarksPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarksPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
