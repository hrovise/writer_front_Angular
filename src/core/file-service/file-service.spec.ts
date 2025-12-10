import { TestBed } from '@angular/core/testing';

import { FileService } from './file-service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
