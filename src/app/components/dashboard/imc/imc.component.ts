import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BodyImc } from 'src/app/models/BodyImc';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-imc',
  templateUrl: './imc.component.html',
  styleUrls: ['./imc.component.css']
})
export class ImcComponent implements OnInit {
  
  loadingForm:boolean  = false;
  loading:boolean = true;

  // Data for table
  newRegisterForm!: FormGroup;
  bodyImcs: BodyImc[] = [];
  bodyImcsPaginated?: BodyImc[];
  actualImc!: number;
  bodyImcsLength!: number;

  calculatedImc:number = 0;

  pageEvent!: PageEvent;

  constructor(private dashboardService: DashboardService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private modalService: NgbModal) {
                this.newRegisterForm = fb.group({
                  weight: ['', Validators.required],
                  height: ['', Validators.required],

                });
               }



   // Paginator
 @ViewChild('paginator', {static:false}) paginator!: MatPaginator;
 @ViewChild("newImc", {static: false}) newImc!: TemplateRef<any>;


  ngOnInit(): void {
    this.getBodyImcs();
  }

  getBodyImcs() {

    this.dashboardService.getBodyImcs().subscribe(bodyImcData => {
      
      this.loading = true;
      if(!bodyImcData.empty){
        this.bodyImcs = bodyImcData;
        this.bodyImcsLength = this.bodyImcs.length;
        this.actualImc = this.bodyImcs[0].imc;
      }
      this.paginator ? this.paginator._intl.itemsPerPageLabel = "Registros por página": null;
      this.pageEvent  = {
        pageIndex: 0,
        pageSize: 5,
        length: this.bodyImcsLength
      }
      this.pagination(this.pageEvent);

      this.loading = false;
      
    }, err =>  {
      console.log('err', err);
    })
  }

  calculateImc(): void{

    let height: number = this.newRegisterForm.get('height')?.value / 100;
    let weight: number = this.newRegisterForm.get('weight')?.value;
    let imc: number = 0;

    if (this.newRegisterForm.get('weight')?.dirty && this.newRegisterForm.get('height')?.dirty) {

      imc = weight / Math.pow(height, 2);
    }

    if (imc < 70 && imc >= 10) {
      this.calculatedImc = parseFloat(imc.toFixed(2));
    } 
    else {
      this.calculatedImc = 0;
    }
  }

  createRegister(): void {

    let BodyImcRegister: BodyImc = {
      imc: this.calculatedImc,
    }

    this.loadingForm = true;

    this.dashboardService.createBodyImcRegister(BodyImcRegister).subscribe(workout => {
      
      this.snackBar.open("Se ha agregado el nuevo registro!", 'Cerrar',{
        duration: 5000,
      })
      
      this.loadingForm = false;
      
      this.getBodyImcs();
      this.closeModal();
      this.newRegisterForm.reset();
    }, err => {
      
      this.snackBar.open('No se ha podido crear el registro, inténtelo de nuevo' , 'Cerrar',{
        duration: 5000
      })
      this.closeModal();
      
    })
  }



  pagination(event: PageEvent): PageEvent{

    this.bodyImcsPaginated = this.bodyImcs.slice(event.pageSize * event.pageIndex, event.pageSize * (event.pageIndex + 1)  )
    return event;
  }

  openModal(): void {
    this.modalService.open(this.newImc, {centered: true, size: "lg"});
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }

}
