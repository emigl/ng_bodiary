import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Workout } from 'src/app/models/Workout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  loadingForm:boolean  = false;
  loading:boolean = true;
  // Data for table
  newRegisterForm: FormGroup;
  workoutDisplayTable?: Workout[];
  filteredWorkouts?: Workout[];
  workouts: Workout[] = [];
  workoutsLength: number = 0;
  // Data for filter Select
  trainingExercises:any[] = [];

  pageEvent!: PageEvent;

  _listFilter!: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredWorkouts = this.listFilter ? this.performFilter(this.listFilter) : this.workouts;
    this.workoutsLength = this.filteredWorkouts.length | 0;
    this.pagination(this.pageEvent);
  }
  

  constructor(private dashboardService: DashboardService,
              private snackBar: MatSnackBar,
              private modalService: NgbModal,
              private fb: FormBuilder,
              ) {

                
                this.newRegisterForm = this.fb.group({
                  type: ['', Validators.required],
                  weight: ['', [Validators.required]],
                  sets: ['', [Validators.required]],

                  reps: ['', [Validators.required,]],
                })    
  }

  // Paginator
  @ViewChild('paginator', {static:false}) paginator!: MatPaginator;

  @ViewChild("newExercise", {static: false}) newExercise!: TemplateRef<any>;

  ngOnInit(): void {
    
    this.getWorkouts();
    this.getTrainingExercises();
    
    
  }

  performFilter(filterBy: string): Workout[] {
    if(filterBy != undefined){
      filterBy = filterBy.toLocaleLowerCase();
      
      return this.workouts.filter((workout: Workout) =>
          workout.name.toLocaleLowerCase().indexOf(filterBy) !== -1);

    } else {
      return this.workouts;
    }
}

  getWorkouts(): void {
    this.dashboardService.getWorkouts().subscribe(workouts => {
      
      this.loading = true;
      if(!workouts.empty){ 
        this.workoutDisplayTable = this.workouts = this.filteredWorkouts = workouts;
        
        this.workoutsLength = this.workouts.length;
        this.paginator ? this.paginator._intl.itemsPerPageLabel = "Registros por página": null;
        

        this.pageEvent  = {
          pageIndex: 0,
          pageSize: 10,
          length: this.workoutsLength
        }

        this.pagination(this.pageEvent);
        this.loading = false;
        
      } else {
        this.snackBar.open(workouts.empty, 'Cerrar');
        this.loading = false;
      }
    }, err => {
      console.log('err:', err);
      this.loading = false;
    })
  }

  getTrainingExercises():void{

    this.dashboardService.getTrainingExercises().subscribe(data => {

      this.loading = true;
      this.trainingExercises = data;
      this.loading = false;

    }, err => {
      console.log('err:', err);
      this.loading = false;
    })
  }


  pagination(event: PageEvent): PageEvent{

    this.workoutDisplayTable = this.workoutDisplayTable ?
    this.filteredWorkouts?.slice(event.pageSize * event.pageIndex, event.pageSize * (event.pageIndex + 1)) :
    undefined;
    return event;

  }

  openModal(): void {
    this.modalService.open(this.newExercise, {centered: true, size: "lg"});
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  createRegister(): void {

    let workoutRegister: Workout = {
      name: this.newRegisterForm.value.type,
      weight: this.newRegisterForm.value.weight,
      sets: this.newRegisterForm.value.sets,
      reps: this.newRegisterForm.value.reps,
    }

    this.loadingForm = true;
    this.dashboardService.createWorkoutRegister(workoutRegister).subscribe(workout => {
      
      this.snackBar.open("Se ha agregado el nuevo registro!", 'Cerrar',{
        duration: 5000,
      })
      
      this.loadingForm = false;
      
      this.getWorkouts();
      this.closeModal();
      this.newRegisterForm.reset();
      this.listFilter = '';
    }, err => {
      
      this.snackBar.open('No se ha podido crear el registro, inténtelo de nuevo' , 'Cerrar',{
        duration: 5000
      })
      this.closeModal();
      
    })
    


  }
}
