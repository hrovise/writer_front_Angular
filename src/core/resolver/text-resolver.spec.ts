import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { textResolver } from './text-resolver';
import { provideZonelessChangeDetection } from '@angular/core';

describe('textResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => textResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideZonelessChangeDetection()]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
