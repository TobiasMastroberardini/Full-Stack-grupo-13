import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  user: any = {
    name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
  };
  message: string | null = null;

  constructor(private userService: UserDataService) { }

  onSubmit() {
    this.userService.createUser(this.user).subscribe(
      response => {
        this.message = 'Usuario creado correctamente con ID ' + response.user_id;
        this.resetForm();
      },
      error => {
        this.message = 'Error al crear usuario: ' + error;
      }
    );
  }

  resetForm() {
    this.user = {
      name: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
    };
  }
}