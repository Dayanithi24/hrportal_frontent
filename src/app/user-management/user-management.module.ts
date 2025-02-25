import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, RouterLink } from '@angular/router';
import { userManagementRoutes } from './user-management.routes';
import { CreateUserComponent } from './create-user/create-user.component';



@NgModule({
  declarations: [UserListComponent, CreateUserComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(userManagementRoutes),
    ReactiveFormsModule,
    RouterLink
  ]
})
export class UserManagementModule { }
