import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Textreader } from './textreader';

describe('Textreader', () => {
  let component: Textreader;
  let fixture: ComponentFixture<Textreader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Textreader]
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
