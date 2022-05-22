import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/Errors/MyErrorStateMatcher';
import { User } from 'src/app/models/User';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  matcher = new MyErrorStateMatcher();
  constructor(private fb: FormBuilder,
              private router: Router,
              private registerService: RegisterService,
              private snackBar: MatSnackBar) {
                this.registerForm = this.fb.group({
                  name: ['', Validators.required],
                  email: ['', [Validators.required, Validators.email]],
                  // La password debe contener 1 letra mayúscula, 1 minúscula, 1 número y una logitud de 6 carácteres.
                  password: ['', [Validators.required, Validators.pattern(/^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)]],
                  // Si da error puede ser el valor false.
                  confirmPassword: ['']

                }, {validators: this.confirmPasswordValidator})
  }

  ngOnInit(): void {
    
    
  }
  getErrorMessage() {
    this.snackBar.open('Ha habido un error, ¡inténtalo de nuevo!', 'Cerrar', {
      duration: 5000
    })
    
  }
  getOkMessage() {
    this.snackBar.open('Se ha creado el usuario con éxito!', 'Cerrar',{
      duration:5000
    });
  }

  register(): void {
    this.loading = true;


    const user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name
    }

    this.registerService.registerUser(user).subscribe(data => {

      this.loading = false;
      this.getOkMessage();
      this.router.navigate(['/index/login']);
    }, err => {
      var { message } = err.error;
      
      // console.log('message', message);
      this.getErrorMessage();
      this.loading = false;
    })

  }

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    return password && confirmPassword && password.value !== confirmPassword.value ? { notSame: true} : null;
  };
  
  
}