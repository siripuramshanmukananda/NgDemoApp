import { Routes } from '@angular/router';
import { Home } from './Components/HomePage/home/home';
import { Login } from './Components/LoginPage/login/login';
import { VerifyMobileNumber } from './Components/VerifyMobileNumberPage/verify-mobile-number/verify-mobile-number';
import { ForgotPassword } from './Components/LoginPage/ForgotPasswordPage/forgot-password/forgot-password';
import { Members } from './Components/MembersPage/members/members';
import { CoreTeam } from './Components/CoreTeamPage/core-team/core-team';
import { SpecialThanks } from './Components/SpecialThanksPage/special-thanks/special-thanks';
import { Layout } from './Components/LayoutPage/layout/layout';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'forgotPassword', component: ForgotPassword },
    { path: 'verify', component: VerifyMobileNumber },

    {
        path: '',             
        component: Layout,
        children: [
            { path: 'home', component: Home },
            { path: 'members', component: Members },
            { path: 'coreTeam', component: CoreTeam },
            { path: 'specialThanks', component: SpecialThanks }
        ]
    },

    { path: '**', redirectTo: 'login' }
]
