import { FocusMonitor } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username:string = '';
  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  
  constructor(private observer: BreakpointObserver,
              private cdref: ChangeDetectorRef,
              private focusMonitor: FocusMonitor,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
    
  }
  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.focusMonitor.stopMonitoring(document.getElementById('menu-button')!);
    this.focusMonitor.stopMonitoring(document.getElementById('menu-open-icon')!);
    
    this.getUser();
    this.cdref.detectChanges();
  }
  
  ngOnInit(): void {
  }

  toggleSideNav(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.toggle();
        this.focusMonitor.stopMonitoring(document.getElementById('menu-button')!);
        this.focusMonitor.stopMonitoring(document.getElementById('menu-open-icon')!);
        
      } else {

      }
    });
    this.cdref.detectChanges();
  }

  logout(): void {

    let token = this.authService.getLocalStorageToken();

    this.authService.logout(token).subscribe(response => {
      this.authService.rmLocalStorage();
    }, err => {
      // console.log('err', err)
    })
    if(token) {
      this.snackBar.open('¡Has cerrado sesión con éxito!', 'Cerrar', {
        duration: 5000
      })
    }
    this.router.navigate(['/index/login'])
  }

  // Recupera el nombre de usuario para introducirlo en el menú
  getUser(): void {
    this.username = this.authService.getLocalStorageUsername() || '';
  }

}
