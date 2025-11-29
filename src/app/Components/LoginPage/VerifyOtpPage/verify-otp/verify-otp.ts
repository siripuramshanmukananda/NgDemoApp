import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login-service';

@Component({
  selector: 'app-verify-otp',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss',
})
export class VerifyOtp {
  verifyOtpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private _loginService: LoginService){
    this.verifyOtpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]  
    })
  }

  get otp(){
    return this.verifyOtpForm.get('otp')
  }

  data: any;
  otpVerifyMessage = "";
  verifyOTP(){
    if(this.otp?.invalid){
      this.verifyOtpForm.markAllAsTouched();
          alert("Invalid otp");
          return;
    }

    this.data = {
      mobileNumber: this.verifyOtpForm.get('mobileNumber')?.value,
      otp: this.verifyOtpForm.get('otp')?.value,
    }
    
    this._loginService.postVerifyOtp(this.data).subscribe((response) => {
      if(response){
        this.router.navigate(['home'])
      }else{
        alert('Otp verification failed');
      }
    },
    (error) => {
      this.otpVerifyMessage = error.error?.message;
    }
  )
}

}
