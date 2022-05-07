import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyWeightComponent } from './body-weight/body-weight.component';
import { DashboardComponent } from './dashboard.component';
import { FaqComponent } from './faq/faq.component';
import { ImcComponent } from './imc/imc.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children:[
    {path: 'training', component: TrainingComponent},
    {path: 'bodyWeight', component: BodyWeightComponent},
    {path: 'imc', component: ImcComponent},
    {path: 'faq', component: FaqComponent},

    {path: '**', redirectTo: 'training'},

  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
