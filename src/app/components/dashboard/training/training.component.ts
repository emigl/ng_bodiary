import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Workout } from 'src/app/models/Workout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  filterSelected = '';
  loading:boolean = true;
  // Data for table
  workoutDisplayTable!: Workout[];

  filteredWorkouts: Workout[];
  workouts: Workout[] = [];
  // Data for filter Select
  trainingExercises:any[] = [];

  workoutsLength: number = 0;
  pageEvent!: PageEvent;

  _listFilter!: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    // console.log('value', value)
    this.filteredWorkouts = this.listFilter ? this.performFilter(this.listFilter) : this.workouts;
    this.workoutsLength = this.filteredWorkouts.length;
    this.pagination(this.pageEvent);
    console.log('filteredWorkouts', this.filteredWorkouts)
    // console.log('this.listFilter', this.listFilter)
    // console.log('this.performFilter(this.listFilter)', this.performFilter(this.listFilter));
  }
  
 

  constructor(private dashboardService: DashboardService,
              private snackBar: MatSnackBar) 
              {
                this.filteredWorkouts = this.workouts;
                
              }

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


        this.pageEvent  = {
          pageIndex: 0,
          pageSize: 3,
          length: this.workoutsLength
        }
        // console.log('this.filteredWorkouts', this.filteredWorkouts);

        this.pagination(this.pageEvent);

        // console.log('this.Workouts', this.workouts);

        // console.log('this.filteredWorkouts', this.filteredWorkouts);
        // console.log('loading', this.loading);

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
      // console.log('this.trainingExercises', this.trainingExercises);
      this.loading = false;

    }, err => {
      console.log('err:', err);
      this.loading = false;
    })
  }


  pagination(event: PageEvent): PageEvent{
    // console.log(event);
    // console.log('this.workouts', this.workouts);

    // console.log('this.filteredWorkouts', this.filteredWorkouts);

    if(event.pageIndex === 0){
    this.workoutDisplayTable = this.filteredWorkouts.slice(event.pageSize * event.pageIndex, event.pageSize * (event.pageIndex + 1)  )

    }else {

      this.workoutDisplayTable = this.filteredWorkouts.slice(event.pageSize  * event.pageIndex , event.pageSize * (event.pageIndex + 1)  )
    }
    
    // console.log('this.filteredWorkouts', this.filteredWorkouts);

    return event;
  }
}
