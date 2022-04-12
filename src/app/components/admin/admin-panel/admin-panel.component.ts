import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User';
import { AdminPanelService } from 'src/app/services/admin-panel.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  users: User[] = [];
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[];
  loading = false;
  constructor(private adminPanelService: AdminPanelService,
              private snackBar: MatSnackBar) { 
    this.displayedColumns = ['ID','Nombre', 'Email', 'Activo'];
  }
  @ViewChild('paginator') paginator!: MatPaginator;
  ngOnInit(): void {
    
    this.getUsers();
  }


  getUsers(): void{
    this.loading = true;
    this.adminPanelService.getUsers().subscribe(data => {

      this.users = this.convertIsActiveUsers(data);

      this.dataSource = new MatTableDataSource(this.users);

      this.paginator._intl.itemsPerPageLabel = "Usuarios por página";
      this.dataSource.paginator = this.paginator || null;
      // this.adminPanelService.saveLocalStorage(data);
      this.loading = false;

      
    }, err => {
      console.log('err:', err);
      this.loading = false;
    })
  }

  // Convierte el boolean isActive en un Si o un No.
  convertIsActiveUsers(users:User[]): User[] {
    
    var usersChanged: User[] = [];
    users.forEach(user => {
      if(user.isActive){
        user.isActive = "Si";
        usersChanged.push(user);
      } else{
        user.isActive = "No";
        usersChanged.push(user);
      }

    })

    return usersChanged;

  }
  
  

  getErrorMessage(){
    this.snackBar.open('No se ha podido eliminar el usuario', 'Cerrar', {
      duration: 5000
    })
  }
  getMessage(){
    this.snackBar.open('Se ha eliminado el usuario con éxito.', 'Cerrar', {
      duration: 5000

    })
  }
}
