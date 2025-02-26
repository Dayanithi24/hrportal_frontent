import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

export const userManagementRoutes: Routes = [
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'list', component: UserListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full'}, 
  { path: 'create-user', component: CreateUserComponent }
]