import { Routes } from "@angular/router";
import { CreateLeavePolicyComponent } from "./create-leave-policy/create-leave-policy.component";
import { LeaveProfileComponent } from "./leave-profile/leave-profile.component";
import { LeaveRequestComponent } from "./leave-request/leave-request.component";

export const leaveManagementRoutes: Routes = [
  { path: 'leave-policy', component: CreateLeavePolicyComponent},
  { path: 'leave', component: LeaveProfileComponent},
  { path: 'request', component: LeaveRequestComponent},
  { path: '', redirectTo: 'leave', pathMatch: 'full'}
]