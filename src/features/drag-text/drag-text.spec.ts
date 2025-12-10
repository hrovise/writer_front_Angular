import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragTextComponent } from './drag-text';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FileService } from '../../core/file-service/file-service';
import { of } from 'rxjs';

describe('DragTextComponent', () => {
  let component: DragTextComponent;
  let fixture: ComponentFixture<DragTextComponent>;
 let mockFileService: any;
  
  beforeEach(async () => {
     mockFileService = jasmine.createSpyObj('FileService', ['getChunk', 'getAllTexts']);

    
    mockFileService.getChunk.and.returnValue(of({ content: 'Fake Text' })); 
    mockFileService.getAllTexts.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [DragTextComponent],
      providers: [
        provideZonelessChangeDetection(),
        
        
  { provide: FileService, useValue: mockFileService }, 
  provideRouter([])
        
    
      ]
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
