import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-verify-mobile-number',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify-mobile-number.html',
  styleUrl: './verify-mobile-number.scss',
})
export class VerifyMobileNumber {
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
  otpErrorMessage = "";
  isOtpSent = false;
  countdown: number = 0;
  timerInterval: any;

  startCountdown() {
    this.countdown = 30;

    this.timerInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

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
        this.isOtpSent = true;
        this.startCountdown()
        setTimeout(() => {
          this.otpMessage = "";
        }, 30000);
      } else {
        alert('Mobile number is not valid');
      }
    },
      (error) => {
        alert(error.error?.message);
      })
  }

  otpVerifyMessage = "";
  verifyOTP() {
    if (this.otp?.invalid) {
      this.verifyForm.markAllAsTouched();
      alert("Invalid otp");
      return;
    }

    // clearInterval(this.timerInterval);
    // this.countdown = 0;

    this.data = {
      mobileNumber: this.verifyForm.get('mobileNumber')?.value,
      otp: this.verifyForm.get('otp')?.value,
    }

    this._loginService.postVerifyOtp(this.data).subscribe((response) => {
      if (response) {
        clearInterval(this.timerInterval);
        this.countdown = 0;

        this.router.navigate(['forgotPassword'], {
          queryParams: { mobile: this.verifyForm.get('mobileNumber')?.value }
        });
      } else {
        alert('Otp verification failed');
      }
    },
      (error) => {
        if (this.countdown == 0) {
          this.otpVerifyMessage = error.error?.message;
        } else {
          alert(error.error?.message);
        }
        //this.otpVerifyMessage = error.error?.message;
      }
    )
  }

  otpResendMessage = "";
  resendOTP() {
    if (this.countdown > 0) {
      return;
    }
    if (this.mobileNumber?.invalid) {
      this.verifyForm.markAllAsTouched();
      alert("Invalid mobile number");
      return;
    }

    this.data = {
      mobileNumber: this.verifyForm.get('mobileNumber')?.value
    }

    this._loginService.postResendOtp({ mobileNumber: this.data.mobileNumber }).subscribe((response) => {
      console.log(response);
      if (response) {
        this.otpResendMessage = response.message
      } else {
        alert('Otp resend failed');
      }
    },
      (error) => {
        alert('Otp resend failed');
      }
    );
  }
}
