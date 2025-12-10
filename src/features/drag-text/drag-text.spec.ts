import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragText } from './drag-text';

describe('DragText', () => {
  let component: DragText;
  let fixture: ComponentFixture<DragText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
