import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  appUrl: string;
  apiUrl: string;

  constructor(private http: HttpClient) { 
    this.appUrl = environment.appUrl;
    this.apiUrl = 'auth/login';

  }

   // Post a /api/Login que sirve para comprobar si existe un user en la bdd y poder logearse.
   login(user: User): Observable<any> {

    // Como primer parámetro coge la URL a donde apunta, como segundo parámetro, la información que se va a pasar por ahí.
    return this.http.post(this.appUrl+this.apiUrl, user);
  }

  setLocalStorage(data: string): void {
    localStorage.setItem('token', data);
  }

  rmLocalStorage(): void{
    localStorage.removeItem('token');
  }

  getToken():string | null {

    return localStorage.getItem('token') || null;
  }

  logout(token: string | null): Observable<any>{

    const headers = this.getAuthHeaders(token);
    
    this.rmLocalStorage();
    return this.http.post(
      this.appUrl+'auth/logout', 
    '', {headers: headers});
  }

  getAuthHeaders(token: string | null): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }
}
