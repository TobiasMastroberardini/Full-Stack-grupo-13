import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: UserDataService, private router: Router) { }

  onSubmit(): void {
    console.log("usuario: ", this.loginData.email, " Contra: ", this.loginData.password)
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(
      response => {
        localStorage.setItem('token', response.token); // Guardar token en localStorage
        this.router.navigate(['/home-admin']); // Redirigir al usuario a la página de inicio
      },
      error => {
        console.error('Error en el login:', error);
        // Manejar errores de autenticación (mostrar mensaje al usuario, etc.)
      }
    );
  }
}