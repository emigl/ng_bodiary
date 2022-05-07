import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AdminPanelService } from 'src/app/services/admin-panel.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  
  user!: User;
  editUserForm!: FormGroup;
  userId!: number;
  isActive:number = 0;

  loadingUser = false;
  loading = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminPanelService: AdminPanelService,
    private snackBar: MatSnackBar) {
      this.userId = this.route.snapshot.params['id'];
      this.getUser(this.userId);
      this.editUserForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        isActive: ['', Validators.required]
      })
    }
    
    ngOnInit(): void {
      
      
      
    }
    
    
    
    getUser(id: number): any{
      let user = this.adminPanelService.getUserDetail(id).subscribe(data => {

        this.loadingUser = true;
        
        this.user = data[0];

        this.editUserForm.controls['name'].setValue(this.user.name);
        this.editUserForm.controls['email'].setValue(this.user.email);
        this.editUserForm.controls['isActive'].setValue(this.user.isActive);

        this.loadingUser = false;
   }, err => {
     console.log('err', err)
     this.snackBar.open("No se puede obtener el usuario, puede que no exista.", "Cerrar", {
      duration:5000
    });
     this.loadingUser = false;
   })
   return user;
  }

  updateUser():void{
    const user: User = {
      email: this.editUserForm.value.email,
      name: this.editUserForm.value.name,
      isActive: this.editUserForm.value.isActive
    }
    this.loading = true;
    this.adminPanelService.updateUser(this.userId, user).subscribe(data => {
      if(data.ok){
        this.router.navigate(['/admin/controlPanel']);
        this.getOkMessage();
      }
      
      this.loading = false;
    }, err => {
      let { error } = err.error
      console.log('err', err)
      this.getErrorMessage(error);
      this.loading = false;
    })
  }

  deleteUser():void{

    let idUser = this.userId;
    if(confirm('¿Estás seguro que quieres eliminar el usuario?')){
      this.adminPanelService.deleteUser(idUser).subscribe(data => {
        this.getDeleteMessage();
        this.router.navigate(['/admin/controlPanel']);
      }, err =>{
        this.getErrorMessage(err.error.error);
      })
    }
  }

  getDeleteMessage(){
    this.snackBar.open('Se ha eliminado el usuario con éxito!', 'Cerrar',{
      duration:5000
    });
  }


  getOkMessage() {
    this.snackBar.open('Se ha actualizado el usuario con éxito!', 'Cerrar',{
      duration:5000
    });
  }
  getErrorMessage(errorMessage:string) {
    this.snackBar.open(errorMessage, 'Cerrar', {
      duration: 5000
    })
    
  }
}
