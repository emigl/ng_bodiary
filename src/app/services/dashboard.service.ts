import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BodyImc } from '../models/BodyImc';
import { BodyWeight } from '../models/BodyWeight';
import { Workout } from '../models/Workout';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  appUrl: string;
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.appUrl;
    this.apiUrl = 'dashboard/';
  }
 //--------------- Entrenamiento section --------------------
  createWorkoutRegister(registerWorkout: Workout): Observable<any> {
    return this.http.post(this.appUrl + this.apiUrl + 'createWorkoutRegister', registerWorkout);
  }
  getWorkouts(): Observable<any> {
    return this.http.get(this.appUrl + this.apiUrl + 'getWorkoutRegister');

  }
  getTrainingExercises(): Observable<any> {
    return this.http.get(this.appUrl + this.apiUrl + 'getTrainingExercises');

  }
  // --------------------------------------------------------
  // --------------------Peso section----------------------
  createBodyWeightRegister(registerBodyWeight: BodyWeight): Observable<any> {
    return this.http.post(this.appUrl + this.apiUrl + 'createBodyWeightRegister', registerBodyWeight);
  }
  getBodyWeights(): Observable<any> {
    return this.http.get(this.appUrl + this.apiUrl + 'getBodyWeightRegister');

  }
  // ------------------------------------------------------
  //---------------------- IMC section---------------------
  createBodyImcRegister(registerBodyImc: BodyImc): Observable<any> {
    return this.http.post(this.appUrl + this.apiUrl + 'createImcRegister', registerBodyImc);
  }
  getBodyImcs(): Observable<any> {
    return this.http.get(this.appUrl + this.apiUrl + 'getImcRegister');

  }
 // -------------------------------------------------------
}
