import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragTextComponent } from './drag-text';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('DragTextComponent', () => {
  let component: DragTextComponent;
  let fixture: ComponentFixture<DragTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragTextComponent],
       providers: [provideZonelessChangeDetection(),
        provideHttpClient(),        
        provideHttpClient()]
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
