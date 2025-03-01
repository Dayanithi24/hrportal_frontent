import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { authGuard } from './guards/auth/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
    {path: 'login', title:'Login', component: LoginComponent},
    {path: 'reset-password', title:'Reset-Password', component: ResetPasswordComponent},
    {path: 'home', component: LandingComponent, canActivate: [authGuard],
        children: [
            {path: 'user', loadChildren: () => import('./user-management/user-management.module').then(c => c.UserManagementModule), canActivate: [authGuard]},
            {path: 'leave', loadChildren: () => import('./leave-management/leave-management.module').then(c => c.LeaveManagementModule), canActivate: [authGuard]},
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    // { path: '**', redirectTo: 'login' }
];
