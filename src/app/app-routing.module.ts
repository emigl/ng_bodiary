import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/index/login/login.component';
import { RegisterComponent } from './components/index/register/register.component';

const routes: Routes = [
  // Cambiar cuando haya una página de welcome.
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'admin', loadChildren: () => import('./components/admin/admin.module')
  .then(x => x.AdminModule)},
  {path: 'index', loadChildren: () => import('./components/index/index.module')
  .then(x => x.IndexModule)},
  {path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module')
  .then(x => x.DashboardModule)},
  // Cambiar a una página de error cuando esté completada.
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
