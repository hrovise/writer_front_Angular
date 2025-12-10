import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alltexts } from './alltexts';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FileService } from '../../core/file-service/file-service';
import { of } from 'rxjs';

describe('Alltexts', () => {
  let component: Alltexts;
  let fixture: ComponentFixture<Alltexts>;
    let mockFileService: any;
  
  beforeEach(async () => {
     mockFileService = jasmine.createSpyObj('FileService', ['getChunk', 'getAllTexts']);

    
    mockFileService.getChunk.and.returnValue(of({ content: 'Fake Text' })); 
    mockFileService.getAllTexts.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      imports: [Alltexts],
       providers: [provideZonelessChangeDetection(),
        provideHttpClient(),        
        provideHttpClient(),
      provideRouter([]),
    { provide: FileService, useValue: mockFileService },]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Alltexts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
