import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

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

   getUserDetail(userId: number): Observable<any>{

    return this.http.get(this.appUrl+this.apiUrl+`getUserById/${userId}`)

   }

   deleteUser(userId:number): Observable<any>{

     return this.http.delete(this.appUrl+this.apiUrl+`deleteUser/${userId}`);

   }

   updateUser(userId:number, user:User):Observable<any> {
     return this.http.put(this.appUrl+this.apiUrl+`updateUser/${userId}`, user);
   }
}
