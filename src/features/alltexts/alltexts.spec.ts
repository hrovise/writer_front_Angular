import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alltexts } from './alltexts';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('Alltexts', () => {
  let component: Alltexts;
  let fixture: ComponentFixture<Alltexts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alltexts],
       providers: [provideZonelessChangeDetection(),
        provideHttpClient(),        
        provideHttpClient(),
      provideRouter([]) ]
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
