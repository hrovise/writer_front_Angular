import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Textreader } from './textreader';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { FileService } from '../../core/file-service/file-service';

describe('Textreader', () => {
  let component: Textreader;
  let fixture: ComponentFixture<Textreader>;
let mockFileService: any;
  beforeEach(async () => {
     mockFileService = jasmine.createSpyObj('FileService', ['saveText', 'getChunk', 'getText']);
    
   
    mockFileService.saveText.and.returnValue(of({})); 
    mockFileService.getChunk.and.returnValue(of({ content: 'Mock Content' }));
    await TestBed.configureTestingModule({
      imports: [Textreader],
       providers: [provideZonelessChangeDetection(),
        provideHttpClient(),        
        provideHttpClient(),
        { provide: FileService, useValue: mockFileService },
      provideRouter([]) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Textreader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
