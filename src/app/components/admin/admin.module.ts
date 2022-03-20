import { NgModule } from '@angular/core';

// Modules
import { AdminRoutingModule } from './admin-routing.module';


// Components
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminComponent } from './admin.component';
import { ComponentsModule } from '../components.module';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminComponent,
  ],
  imports: [
    AdminRoutingModule,
    ComponentsModule,
  ]
})
export class AdminModule { }
