import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsModule } from '../components.module';
import { MaterialModule } from 'src/app/material/material.module';
// Components
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    MaterialModule,
  ]
})
export class DashboardModule { }
