import { Routes } from '@angular/router';
import { CreateLeavePolicyComponent } from './create-leave-policy/create-leave-policy.component';
import { LeaveProfileComponent } from './leave-profile/leave-profile.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveCalendarComponent } from './leave-calender/leave-calender.component';
import { roleGuard } from '../guards/role/role.guard';

export const leaveManagementRoutes: Routes = [
  {
    path: 'create-leave-policy',
    component: CreateLeavePolicyComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN', 'HR'] },
  },
  {
    path: 'leave-calendar',
    component: LeaveCalendarComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN', 'HR'] },
  },
  { path: 'leave', component: LeaveProfileComponent },
  { path: 'request', component: LeaveRequestComponent },
  { path: '', redirectTo: 'leave', pathMatch: 'full' },
];
