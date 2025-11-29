import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  verifyForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private _loginService: LoginService) {
    this.verifyForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    })
  }

  get mobileNumber() {
    return this.verifyForm.get('mobileNumber')
  }

  get otp() {
    return this.verifyForm.get('otp')
  }

  data: any;
  otpMessage = "";
  sendOTP() {
    if (this.mobileNumber?.invalid) {
      this.verifyForm.markAllAsTouched();
      alert("Invalid mobile number");
      return;
    }

    this.data = {
      mobileNumber: this.verifyForm.get('mobileNumber')?.value,
      otp: this.verifyForm.get('otp')?.value,
    }
    // call sendOtp api
    this._loginService.postSendOtp({ mobileNumber: this.data.mobileNumber }).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.otpMessage = "Otp sent successfully";
      } else {
        alert('Mobile number is not valid');
      }
    })

    //this.router.navigate(['home'])
  }

  otpVerifyMessage = "";
  verifyOTP() {
    if (this.otp?.invalid) {
      this.verifyForm.markAllAsTouched();
      alert("Invalid otp");
      return;
    }

    this.data = {
      mobileNumber: this.verifyForm.get('mobileNumber')?.value,
      otp: this.verifyForm.get('otp')?.value,
    }

    this._loginService.postVerifyOtp(this.data).subscribe((response) => {
      if (response) {
        this.router.navigate(['home'])
      } else {
        alert('Otp verification failed');
      }
    },
      (error) => {
        this.otpVerifyMessage = error.error?.message;
      }
    )
  }
}
