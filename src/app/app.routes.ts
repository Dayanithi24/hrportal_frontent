import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    {path: 'login', title:'Login', component: LoginComponent},
    {path: 'home', component: LandingComponent, canActivate: [authGuard],
        children: [
            {path: 'user-management', loadChildren: () => import('./user-management/user-management.module').then(c => c.UserManagementModule), canActivate: [authGuard]},
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    // { path: '**', redirectTo: 'login' }
];
