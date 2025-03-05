import { Routes } from "@angular/router";
import { MyDocComponent } from "./my-doc/my-doc.component";
import { AllDocsComponent } from "./all-docs/all-docs.component";
import { roleGuard } from "../guards/role/role.guard";

export const docManagementRoutes: Routes = [
    { path: 'all-docs', component: AllDocsComponent, canActivate: [roleGuard], data: {roles: ['ADMIN', 'HR']}},
    { path: ':id', component: MyDocComponent},
]