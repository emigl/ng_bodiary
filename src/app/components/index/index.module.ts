import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index.component';

import { ComponentsModule } from '../components.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    IndexComponent,
  ],
  imports: [
    IndexRoutingModule,
    ComponentsModule
  ]
})
export class IndexModule { }
