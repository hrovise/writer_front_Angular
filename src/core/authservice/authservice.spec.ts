import { TestBed } from '@angular/core/testing';

import { Authservice } from './authservice';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('Authservice', () => {
  let service: Authservice;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(),
       provideHttpClient(),        
        provideHttpClient() ]
    });
    service = TestBed.inject(Authservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
