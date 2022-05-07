import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logout(){
    let token = this.authService.getLocalStorageToken();
    this.authService.logout(token).subscribe(data => {
      
      this.getLogoutMessage(data.ok);
      this.authService.rmLocalStorage();

      this.router.navigate(["/index"]);

    });
  }

  getLogoutMessage(message: string){
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000

    })
  }
}
