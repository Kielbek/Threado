import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadoSelectorComponent } from './threado-selector.component';

describe('ThreadoSelectorComponent', () => {
  let component: ThreadoSelectorComponent;
  let fixture: ComponentFixture<ThreadoSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadoSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadoSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
