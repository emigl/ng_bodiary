import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private snackBar: MatSnackBar) {
                this.loginForm = this.fb.group({
                  email: ['admin@bodiary.com', [Validators.required, Validators.email]],
                  // Mostrar el minimo de longitud en el html
                  password: ['123456',[Validators.required, Validators.minLength(6)]],
                  // Si da error puede ser el valor false.
                  remember: [false, Validators.required]

                })
               }

  ngOnInit(): void {

  }
  getErrorMessage(){
    this.snackBar.open('Las credenciales no son válidas, ¡inténtalo de nuevo!', 'Cerrar', {
      duration:5000
    })
  }
  getLoginMessage(){
    this.snackBar.open('Has iniciado sesión, bienvenidx!', 'Cerrar', {
      duration:5000
    })
  }
  login():void{
    this.loading = true;
    
    
      const user: User = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }
      
      this.loginService.login(user).subscribe(data => {

        console.log(data);
        //  Save token to Local Storage
        this.loginService.setLocalStorage(data.access_token);

        this.loading = false;
        this.getLoginMessage()
        if (data.role == 1){
          this.router.navigate(['/admin/controlPanel'])
        }
        else {
          this.router.navigate(['/dashboard']);
        }
        
      }, err => {
        var { message } = err.error;
        // console.log('message', message);
        this.getErrorMessage();
        this.loginForm.controls["password"].reset();
        this.loading = false;
      })

}

}