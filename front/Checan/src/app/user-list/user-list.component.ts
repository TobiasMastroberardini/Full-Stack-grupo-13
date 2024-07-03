import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoBackComponent } from '../go-back/go-back.component';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, GoBackComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserDataService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('Usuarios obtenidos:', this.users);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
}
