import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragTextComponent } from './drag-text';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('DragTextComponent', () => {
  let component: DragTextComponent;
  let fixture: ComponentFixture<DragTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragTextComponent],
       providers: [provideZonelessChangeDetection(),
        provideHttpClient(),        
        provideHttpClient(),
      provideRouter([]) ]
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
