import { Routes } from '@angular/router';
import { Home } from './Components/HomePage/home/home';
import { Login } from './Components/LoginPage/login/login';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'home', component: Home}
];
