import { TestBed } from '@angular/core/testing';

import { Layout } from './layout';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Layout', () => {
  let service: Layout;

  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(Layout);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
