import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.getLocalStorageUsername() != null){

        if(this.authService.getLocalStorageUsername() != 'bodiadmin'){
          console.log('Ruta protegida');
          this.router.navigate(['/dashboard']);
        }
      }else{
        this.router.navigate(['']);
      }
    return true;
  }
  
}
