import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private _loginService: LoginService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  data: any;
  id: any = 1;

  submit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      alert("Invalid credentials");
      return;
    }

    //console.log(this.loginForm.value);
    this.data = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
    console.log(this.data);

    //call api
    this._loginService.postLogin(this.data).subscribe((response:any) => {
      console.log(response);
      if(response){
        this.router.navigate(['home']);
      }else{
        alert('User data is not valid');
      }
    })
    
  }
}
