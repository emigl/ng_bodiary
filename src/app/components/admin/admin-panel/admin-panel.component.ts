import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  constructor(private adminPanelService: AdminPanelService) { 
    this.displayedColumns = ['ID','Nombre', 'Email', 'Activo', 'Acciones'];
  }
  @ViewChild('paginator') paginator!: MatPaginator;
  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(): void{
    this.loading = true;
    this.adminPanelService.getUsers().subscribe(data => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator || null;
      this.loading = false;
      console.log('this.dataSource', this.dataSource)
      console.log('this.users', this.users)
    }, err => {
      console.log('err:', err);
      this.loading = false;
    })
  }

  

}
