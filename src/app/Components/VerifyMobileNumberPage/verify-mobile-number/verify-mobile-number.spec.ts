import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyMobileNumber } from './verify-mobile-number';

describe('VerifyMobileNumber', () => {
  let component: VerifyMobileNumber;
  let fixture: ComponentFixture<VerifyMobileNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyMobileNumber]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyMobileNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
