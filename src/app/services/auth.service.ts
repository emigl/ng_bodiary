import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  appUrl: string;
  apiUrl: string;

  constructor(private http: HttpClient,
              ) { 
    this.appUrl = environment.appUrl;
    this.apiUrl = 'auth/';
    
  }
  // Post a /api/Login que sirve para comprobar si existe un user en la bdd y poder logearse.
  login(user: User): Observable<any> {
    // Como primer parámetro coge la URL a donde apunta, como segundo parámetro, la información que se va a pasar por ahí.
    return this.http.post(this.appUrl+this.apiUrl+'login', user);
  }

  logout(token: string | null): Observable<any>{
  
    // const headers = this.getAuthHeaders(token);
      

    return this.http.post(
      this.appUrl+this.apiUrl+'logout', 
      '');
  }
  
  
 // Local Storage session Token
  setLocalStorageToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getLocalStorageToken():string | null {
    return localStorage.getItem('token') || null;
  }

  rmLocalStorageToken(): void{
    localStorage.removeItem('token');
  }

 // Local Storage User
  setLocalStorageUsername(username:string): void {
    localStorage.setItem('user', username);
  }

  getLocalStorageUsername():string | null {
    return localStorage.getItem('user') || null;
  }

  rmLocalStorageUsername(): void{
    localStorage.removeItem('user');
  }

  rmLocalStorage():void {
    this.rmLocalStorageToken();
    this.rmLocalStorageUsername();
  }
  getUser(): Observable<any> {
    // const headers = this.getAuthHeaders(token);

    return this.http.get(this.appUrl+this.apiUrl+'user');
  }

  // getAuthHeaders(token: string | null): HttpHeaders {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });

  //   return headers;
  // }

}
