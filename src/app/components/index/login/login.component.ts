import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
              private loginService: LoginService) {
                this.loginForm = this.fb.group({
                  email: ['', Validators.required],
                  password: ['', Validators.required],
                  // Si da error puede ser el valor false.
                  remember: [false, Validators.required]

                })
               }

  ngOnInit(): void {
  }
  getErrorMessage(){
    
  }
  login():void{
    
    // this.loading = true;
    
    //   const user: User = {
    //     email: this.loginForm.value.email,
    //     password: this.loginForm.value.password,
    //   }
    //   )
    //   this.loginService.login(user).subscribe(data => {

    //     console.log(data);
         // Save Jwt token to Local Storage
    //     this.loginService.setLocalStorage(data.token);

    //     this.toastr.success('Ya puedes ver los cuestionarios', 'Acceso concedido');

    //     this.loading = false;
    //     this.router.navigate(['/dashboard']);
    //   }, err => {
    //     console.log(err);
    //     var { message } = err.error;
    //     this.toastr.error(message, 'Inicio de sesión incorrectos');
    //     this.loading = false;
      // })

}

}