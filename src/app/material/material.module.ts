import { NgModule } from '@angular/core';
// Modules
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
     // Material
    //  BrowserAnimationsModule,
     MatSliderModule,
     MatCardModule,
     MatButtonModule,
     MatFormFieldModule,
     MatInputModule,
     MatCheckboxModule,
     MatProgressSpinnerModule,
     MatDividerModule,
     MatSnackBarModule,
     // Bootstrap
     NgbModule,
  ]
})
export class MaterialModule { }
