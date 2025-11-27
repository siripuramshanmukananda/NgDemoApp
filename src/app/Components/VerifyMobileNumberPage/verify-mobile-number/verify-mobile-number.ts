import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-mobile-number',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify-mobile-number.html',
  styleUrl: './verify-mobile-number.scss',
})
export class VerifyMobileNumber {
  verifyForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.verifyForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    })
  }

  get mobileNumber(){
    return this.verifyForm.get('mobileNumber')
  }

  get otp(){
    return this.verifyForm.get('otp')
  }

  submit(){
    if(this.mobileNumber?.invalid){
      this.verifyForm.markAllAsTouched();
      alert("Invalid mobile number");
      return;
    }
    // call sendOtp api

    if(this.otp?.invalid){
      this.verifyForm.markAllAsTouched();
          alert("Invalid otp");
          return;
    }

    this.router.navigate(['home'])
  }
}
