import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';

const routes: Routes = [
    {path: 'login', component: LoginAdminComponent},
    {path: 'controlPanel', component: AdminPanelComponent},
  {
    path: '**', redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
