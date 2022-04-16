import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsModule } from '../components.module';
import { MaterialModule } from 'src/app/material/material.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
// Components
import { DashboardComponent } from './dashboard.component';
import { TrainingComponent } from './training/training.component';
import { BodyWeightComponent } from './body-weight/body-weight.component';
import { ImcComponent } from './imc/imc.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TrainingComponent,
    BodyWeightComponent,
    ImcComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    MaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    
  ]
})
export class DashboardModule { }
