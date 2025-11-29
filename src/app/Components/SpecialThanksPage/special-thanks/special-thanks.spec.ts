import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialThanks } from './special-thanks';

describe('SpecialThanks', () => {
  let component: SpecialThanks;
  let fixture: ComponentFixture<SpecialThanks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialThanks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialThanks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
