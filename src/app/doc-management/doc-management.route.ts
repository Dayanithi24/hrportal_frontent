import { Routes } from "@angular/router";
import { MyDocComponent } from "./my-doc/my-doc.component";

export const docManagementRoutes: Routes = [
    { path: 'my-docs', title: 'My Docs', component: MyDocComponent},
    { path: '', redirectTo: 'my-docs', pathMatch: 'full'}
]