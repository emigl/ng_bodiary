import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BodyWeight } from 'src/app/models/BodyWeight';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-body-weight',
  templateUrl: './body-weight.component.html',
  styleUrls: ['./body-weight.component.css']
})
export class BodyWeightComponent implements OnInit {
  
  loadingForm:boolean  = false;
  loading:boolean = true;
  // Data for table
  newRegisterForm!: FormGroup;
  bodyWeights!: BodyWeight[];
  bodyWeightsPaginated!: BodyWeight[];
  actualWeight!: number;
  bodyWeightsLength!: number;
  pageEvent!: PageEvent;

  constructor(private dashboardService: DashboardService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private modalService: NgbModal) {

              this.newRegisterForm = fb.group({
                weight: ['', Validators.required]
              });
  }
 // Paginator
 @ViewChild('paginator', {static:false}) paginator!: MatPaginator;
 @ViewChild("newWeight", {static: false}) newWeight!: TemplateRef<any>;


  ngOnInit(): void {
    this.getBodyWeights();
  }


  getBodyWeights() {

    this.dashboardService.getBodyWeights().subscribe(bodyWeightsData => {
      
      this.loading = true;
      this.bodyWeights = bodyWeightsData;
      this.bodyWeightsLength = this.bodyWeights.length;
      this.actualWeight = this.bodyWeights[0].weight;
      this.paginator ? this.paginator._intl.itemsPerPageLabel = "Registros por página": null;
      this.pageEvent  = {
        pageIndex: 0,
        pageSize: 5,
        length: this.bodyWeightsLength
      }
      this.pagination(this.pageEvent);

      console.log('bodyWeightsData', bodyWeightsData);
      this.loading = false;
      
    }, err =>  {
      console.log('err', err);
    })
  }

  createRegister(): void {

    let BodyWeightRegister: BodyWeight = {
      weight: this.newRegisterForm.value.weight,
    }
    this.loadingForm = true;

    this.dashboardService.createBodyWeightRegister(BodyWeightRegister).subscribe(workout => {
      
      this.snackBar.open("Se ha agregado el nuevo registro!", 'Cerrar',{
        duration: 5000,
      })
      console.log('loadingForm', this.loadingForm)
      
      this.loadingForm = false;
      
      this.getBodyWeights();
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

    this.bodyWeightsPaginated = this.bodyWeights.slice(event.pageSize * event.pageIndex, event.pageSize * (event.pageIndex + 1)  )
    return event;
  }


  openModal(): void {
    this.modalService.open(this.newWeight, {centered: true, size: "lg"});
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }
}
