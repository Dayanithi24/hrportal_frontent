import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';

export const userManagementRoutes: Routes = [
  { path: 'list', component: UserListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full'}, 
  { path: 'create-user', component: CreateUserComponent }
]