import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { leaveManagementRoutes } from './leave-management.routes';
import { CreateLeavePolicyComponent } from './create-leave-policy/create-leave-policy.component';
import { LeaveProfileComponent } from './leave-profile/leave-profile.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyBalanceComponent } from "./my-balance/my-balance.component";
import { MyRequestsComponent } from "./my-requests/my-requests.component";



@NgModule({
  declarations: [CreateLeavePolicyComponent, LeaveProfileComponent, LeaveRequestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(leaveManagementRoutes),
    FormsModule,
    ReactiveFormsModule,
    MyBalanceComponent,
    MyRequestsComponent
]
})
export class LeaveManagementModule { }
