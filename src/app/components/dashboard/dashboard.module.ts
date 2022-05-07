import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsModule } from '../components.module';
import { MaterialModule } from 'src/app/material/material.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { MatPaginatorModule } from '@angular/material/paginator';
// Components
import { DashboardComponent } from './dashboard.component';
import { TrainingComponent } from './training/training.component';
import { BodyWeightComponent } from './body-weight/body-weight.component';
import { ImcComponent } from './imc/imc.component';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TrainingComponent,
    BodyWeightComponent,
    ImcComponent,
    FaqComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    MaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatExpansionModule,
    PipeModule,
    
  ]
})
export class DashboardModule { }
