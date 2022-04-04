import { NgModule } from '@angular/core';

// Modules
import { AdminRoutingModule } from './admin-routing.module';


// Components
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminComponent } from './admin.component';
import { ComponentsModule } from '../components.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminComponent,
  ],
  imports: [
    AdminRoutingModule,
    ComponentsModule,
    MatPaginatorModule
    
  ]
})
export class AdminModule { }
