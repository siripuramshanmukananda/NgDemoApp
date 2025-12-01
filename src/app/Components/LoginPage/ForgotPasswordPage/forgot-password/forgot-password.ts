import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../../services/login-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  forgotPassword: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private _loginService: LoginService, private route: ActivatedRoute) {
    this.forgotPassword = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  get newPassword() {
    return this.forgotPassword.get('newPassword')
  }

  get confirmPassword() {
    return this.forgotPassword.get('confirmPassword')
  }


  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  mobileNumber: string = '';
  data: any = {};
  errorMessage="";
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mobileNumber = params['mobile'];
      console.log("Mobile number:", this.mobileNumber);
    });
  }

  reset() {
    if (this.newPassword?.invalid) {
      this.forgotPassword.markAllAsTouched();
      alert("Invalid mobile number");
      return;
    }

    this.data = {
      mobileNumber: this.mobileNumber,
      newPassword: this.forgotPassword.get('newPassword')?.value,
      confirmPassword: this.forgotPassword.get('confirmPassword')?.value
    }

    this._loginService.updatePassword(this.data).subscribe((response) => {
      if (response) {
        console.log(response);
        this.router.navigate(['login']);
      }
    },
    (error) => {
      this.errorMessage = error.error?.message;
    }
    )
  }
}
