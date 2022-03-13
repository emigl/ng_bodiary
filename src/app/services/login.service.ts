import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  appUrl: string;
  apiUrl: string;

  constructor(private http: HttpClient) { 
    this.appUrl = environment.appUrl;
    this.apiUrl = 'Login';

  }

   // Post a /api/Login que sirve para comprobar si existe un user en la bdd y poder logearse.
   login(user: User): Observable<any> {

    // Como primer parámetro coge la URL a donde apunta, como segundo parámetro, la información que se va a pasar por ahí.
    return this.http.post(this.appUrl+this.apiUrl,user);
  }

  setLocalStorage(data: string): void {
    localStorage.setItem('token', data);
  }
  
  // getTokenDecoded(): string {
  //   const helper = new JwtHelperService();

  //   const decodedToken = helper.decodeToken(localStorage.getItem('token') || "Cannot get token" );

  //   return decodedToken;
  // }

  rmLocalStorage(): void{
    localStorage.removeItem('token');
  }

  getToken():string | null {

    return localStorage.getItem('token') || null;
  }
}
