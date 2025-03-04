import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { roleGuard } from '../guards/role/role.guard';
import { UpdateUserComponent } from './update-user/update-user.component';

export const userManagementRoutes: Routes = [
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'list', component: UserListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN', 'HR'] },
  },
  {
    path: 'update-user/:id',
    component: UpdateUserComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN', 'HR'] },
  },
];
