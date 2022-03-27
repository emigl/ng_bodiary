import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  appUrl: string;
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.appUrl;
    this.apiUrl = 'auth/changePassword'
   }

  changePassword(passwords: any): Observable<any>{
    return this.http.put(this.appUrl+this.apiUrl+"/ChangePassword",passwords)
  }
}
