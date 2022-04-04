import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {
  
  appUrl: string;
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.appUrl;
    this.apiUrl = 'admin/';
   }

   getUsers(): Observable<any>{

    return this.http.get(this.appUrl+this.apiUrl+'getUsers')
   }
}
