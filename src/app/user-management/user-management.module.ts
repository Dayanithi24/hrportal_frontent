import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, RouterLink } from '@angular/router';
import { userManagementRoutes } from './user-management.routes';
import { CreateUserComponent } from './create-user/create-user.component';
import { AvatarComponent } from "../avatar/avatar.component";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';



@NgModule({
  declarations: [UserListComponent, UserProfileComponent, CreateUserComponent, MyProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(userManagementRoutes),
    ReactiveFormsModule,
    RouterLink,
    AvatarComponent
]
})
export class UserManagementModule { }
