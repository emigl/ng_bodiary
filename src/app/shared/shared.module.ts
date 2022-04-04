import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterIndexComponent } from './footer-index/footer-index.component';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    FooterIndexComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
    
  ],
  exports: [
    FooterIndexComponent,
    LoadingComponent,
    
  ]
})
export class SharedModule { }
