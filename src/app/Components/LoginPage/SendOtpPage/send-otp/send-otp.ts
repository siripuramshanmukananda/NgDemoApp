import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login-service';

@Component({
  selector: 'app-send-otp',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './send-otp.html',
  styleUrl: './send-otp.scss',
})
export class SendOtp {
  sendOtpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private _loginService: LoginService){
    this.sendOtpForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    })
  }

  get mobileNumber(){
    return this.sendOtpForm.get('mobileNumber');
  }

  data: any;
  otpMessage= "";

  sendOTP(){
    if(this.mobileNumber?.invalid){
      this.sendOtpForm.markAllAsTouched();
      alert("Invalid Mobile number");
      return;
    }

    this.data = {
      mobileNumber: this.sendOtpForm.get('mobileNumber')?.value
    }

    this._loginService.postSendOtp({ mobileNumber: this.data.mobileNumber }).subscribe((response:any) => {
      console.log(response);
      if(response){
        this.router.navigate(['verifyOtp'])
      }else {
        alert('Mobile number is not valid');
      }
    },
    (error) => {
      this.otpMessage = error.error?.message;
    }
  )
  }
}
