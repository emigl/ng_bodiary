import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private snackBar: MatSnackBar) {
                this.registerForm = this.fb.group({
                  name: ['', Validators.required],
                  email: ['', [Validators.required, Validators.email]],
                  // La password debe contener 1 letra mayúscula, 1 minúscula, 1 número y una logitud de 6 carácteres.
                  password: ['', [Validators.required, Validators.pattern(/^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)]],
                  // Si da error puede ser el valor false.
                  confirmPassword: ['']

                }, { validator: this.checkPassword })
  }

  ngOnInit(): void {
    console.log(this.registerForm.get('password'))
  }
  getErrorMessage() {
    this.snackBar.open('Las credenciales no son válidas, ¡inténtalo de nuevo!', 'Cerrar', {
    })
    console.log(this.registerForm.get('password'))
  }

  login(): void {
    this.loading = true;


    const user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name
    }

    this.loginService.login(user).subscribe(data => {

      console.log(data);
      //  Save token to Local Storage
      this.loginService.setLocalStorage(data.access_token);

      // this.toastr.success('Ya puedes ver los cuestionarios', 'Acceso concedido');

      this.loading = false;
      this.router.navigate(['/admin/login']);
    }, err => {
      console.log(err);
      var { message } = err.error;
      // this.toastr.error(message, 'Inicio de sesión incorrectos');
      console.log('message', message);
      this.getErrorMessage();
      this.loading = false;
    })

  }
  checkPassword(group: FormGroup):any {

    const pass = group.controls["password"].value;
    const confirmPass =  group.controls["confirmPassword"].value;

    // notSame se introduce en el objeto FormGroup para validar si las contraseñas son iguales
    return pass === confirmPass ? null : {notSame: true};

  }


}
