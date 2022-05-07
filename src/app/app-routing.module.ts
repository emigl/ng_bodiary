import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Cambiar cuando haya una página de welcome.
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'admin', canActivate:[AuthGuard, AuthAdminGuard], loadChildren: () => import('./components/admin/admin.module')
  .then(x => x.AdminModule)},
  {path: 'index', loadChildren: () => import('./components/index/index.module')
  .then(x => x.IndexModule)},
  {path: 'dashboard', canActivate:[AuthGuard], loadChildren: () => import('./components/dashboard/dashboard.module')
  .then(x => x.DashboardModule)},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
