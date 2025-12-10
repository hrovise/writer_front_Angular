import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragTextComponent } from './drag-text';

describe('DragTextComponent', () => {
  let component: DragTextComponent;
  let fixture: ComponentFixture<DragTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
