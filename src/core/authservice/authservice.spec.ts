import { TestBed } from '@angular/core/testing';

import { Authservice } from './authservice';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Authservice', () => {
  let service: Authservice;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(Authservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
