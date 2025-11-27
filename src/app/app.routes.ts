import { Routes } from '@angular/router';
import { Home } from './Components/HomePage/home/home';
import { Login } from './Components/LoginPage/login/login';
import { VerifyMobileNumber } from './Components/VerifyMobileNumberPage/verify-mobile-number/verify-mobile-number';

export const routes: Routes = [
    {path: 'verify', component: VerifyMobileNumber},
    {path: '', component: Login},
    {path: 'home', component: Home}
];
