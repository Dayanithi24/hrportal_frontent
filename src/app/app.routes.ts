import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    {path: 'login', title:'Login', component: LoginComponent},
    {path: '', component: LandingComponent,
        children: [
            { path: 'user-management', loadChildren: () => import('./user-management/user-management.module').then(c => c.UserManagementModule)},
        ]
    },
];
