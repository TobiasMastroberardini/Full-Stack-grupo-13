import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { Product } from './product/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private apiUrl = 'http://127.0.0.1:5000';
  private products: Product[] = [];
  private productsPerPage = 10;

  constructor(private http: HttpClient, private alertService: AlertService) { }

  // Método para obtener todos los productos del servidor
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/productos`)
      .pipe(
        map(products => {
          this.products = products; // Actualiza this.products con los datos obtenidos
          return products;
        })
      );
  }

  // Método para obtener un producto por su ID
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/productos/${productId}`);
  }

  // Método para obtener todos los productos por categoría
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/productos/categorias/${category}`)
      .pipe(
        map(products => {
          this.products = products; // Actualiza this.products con los datos obtenidos
          return products;
        })
      );
  }

  // Método para obtener todos las categorias
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/productos/categorias`)
      .pipe(
        catchError(this.handleError) // Asegúrate de que handleError esté definido y maneje errores adecuadamente
      );
  }

  // Método para agregar un nuevo producto
  addProduct(product: Product): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.alertService.showAlert('Producto agregado a la base de datos');
    return this.http.post<any>(`${this.apiUrl}/productos`, product, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para actualizar un producto
  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.alertService.showAlert('Producto editado correctamente'); // Muestra una alerta de éxito
    console.log(product, product.id)

    return this.http.put<Product>(`${this.apiUrl}/productos/${product.id}`, product, { headers })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }
  // Método para eliminar un producto por su ID
  deleteProductById(productId: number): Observable<any> {
    this.alertService.showAlert('Producto eliminado correctamente');

    return this.http.delete(`${this.apiUrl}/productos/${productId}`)
      .pipe(
        catchError(this.handleError) // Manejo de errores opcional
      );
  }


  // Manejo de errores HTTP
  private handleError(error: any) {
    this.alertService.showAlert('Ocurrio un error. Intente agregar el producto nuevamente');

    console.error('Error en el servicio ProductService:', error);
    return throwError(error);
  }

  // Obtener una página específica de productos paginados
  getPage(page: number): Observable<Product[]> {
    if (this.products.length === 0) {
      return this.getAllProducts().pipe(
        map(() => this.getPaginatedProducts(page))
      );
    } else {
      return of(this.getPaginatedProducts(page));
    }
  }

  // Calcula y devuelve productos paginados
  private getPaginatedProducts(page: number): Product[] {
    const startIndex = (page - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  // Obtiene el número total de páginas basado en la cantidad de productos
  public getTotalPages(): Observable<number> {
    if (this.products.length === 0) {
      return this.getAllProducts().pipe(
        map(() => this.calculateTotalPages())
      );
    } else {
      return of(this.calculateTotalPages());
    }
  }

  // Calcula el número total de páginas
  private calculateTotalPages(): number {
    return Math.ceil(this.products.length / this.productsPerPage);
  }


}
