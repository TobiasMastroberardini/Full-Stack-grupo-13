import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from './alert.service';

interface LoginResponse {
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiUrl = 'https://tmastro.pythonanywhere.com/';

  constructor(private http: HttpClient, private alertService: AlertService) { }


  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/users`, { email, password });
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user).pipe(
      tap(response => {
        this.alertService.showAlert("Usuario creado correctamente");
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.alertService.showAlert(errorMessage);
    return throwError(errorMessage);
  }
}
