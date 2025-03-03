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

import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatDatepickerModule } from "@angular/material/datepicker"

import { SetLeaveComponent } from './set-leave/set-leave.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [CreateLeavePolicyComponent, LeaveProfileComponent, LeaveRequestComponent, SetLeaveComponent, MyBalanceComponent, MyRequestsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(leaveManagementRoutes),
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FullCalendarModule,
]
})
export class LeaveManagementModule { }
