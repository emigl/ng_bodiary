import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private snackbar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');

    if(token){
      request = request.clone({ setHeaders: {'Content-Type': 'application/json', 'Authorization':`Bearer ${token}`}});
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          this.snackbar.open('Vuelva a iniciar sesión, por favor', 'Cerrar', {
            duration: 5000
          })
          this.router.navigate(['/index/login'])
        }
        return throwError(() => error);
      })
    );;
  }
}
