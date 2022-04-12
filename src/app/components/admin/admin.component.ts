import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logout(){
    let token = this.loginService.getToken();
    this.loginService.logout(token).subscribe(data => {
      
      this.getLogoutMessage(data.ok);
      this.router.navigate(["/index"]);

    });
  }

  getLogoutMessage(message: string){
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000

    })
  }
}
