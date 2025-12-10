import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Textreader } from './textreader';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('Textreader', () => {
  let component: Textreader;
  let fixture: ComponentFixture<Textreader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Textreader],
       providers: [provideZonelessChangeDetection(),
        provideHttpClient(),        
        provideHttpClient()]
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
