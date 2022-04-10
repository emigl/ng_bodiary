import { NgModule } from '@angular/core';

// Modules
import { AdminRoutingModule } from './admin-routing.module';


// Components
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminComponent } from './admin.component';
import { ComponentsModule } from '../components.module';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailsComponent } from './admin-panel/user-details/user-details.component';
@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminComponent,
    UserDetailsComponent,
  ],
  imports: [
    AdminRoutingModule,
    ComponentsModule,
    MatPaginatorModule,
    MatSelectModule,
    SharedModule
    
  ]
})
export class AdminModule { }
