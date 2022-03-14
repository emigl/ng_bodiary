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
                  email: ['admin@gmail.com', [Validators.required, Validators.email]],
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

        // this.toastr.success('Ya puedes ver los cuestionarios', 'Acceso concedido');

        this.loading = false;
        this.router.navigate(['/register']);
      }, err => {
        console.log(err);
        var { message } = err.error;
        // this.toastr.error(message, 'Inicio de sesión incorrectos');
        console.log('message', message);
        this.getErrorMessage();
        this.loading = false;
      })

}

}