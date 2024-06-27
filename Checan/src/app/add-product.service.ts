import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AlertService } from './alert.service';
import { Product } from './product/Product';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  private apiUrl = 'http://127.0.0.1:5000';
  products: Product[] = [];

  constructor(private http: HttpClient, private alertService: AlertService) { }


  // Método para agregar un nuevo producto
  addProduct(product: Product): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.alertService.showAlert('Producto agregado a la base de datos');
    return this.http.post<any>(`${this.apiUrl}/productos`, product, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Manejo de errores HTTP
  private handleError(error: any) {
    this.alertService.showAlert('Ocurrio un error. Intente agregar el producto nuevamente');

    console.error('Error en el servicio ProductService:', error);
    return throwError(error);
  }
}
