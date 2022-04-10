import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserDetailsComponent } from './admin-panel/user-details/user-details.component';
import { AdminComponent } from './admin.component';
const routes: Routes = [
    {path: '', component: AdminComponent, children:[
      
      {path: 'controlPanel', component: AdminPanelComponent},
      {path: 'details/:id', component: UserDetailsComponent},

    ]},
    
    {path: '**', redirectTo:'login'}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
