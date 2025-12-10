import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { textResolver } from './text-resolver';

describe('textResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => textResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
