import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from './product/Product';

const URL = 'http://127.0.0.1:5000/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private products: Product[] = [];
  private productsPerPage = 10;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(URL).pipe(
      tap((products: Product[]) => this.products = products)
    );
  }

  public getPage(page: number): Observable<Product[]> {
    if (this.products.length === 0) {
      return this.getAll().pipe(
        map(() => this.getPaginatedProducts(page))
      );
    } else {
      return of(this.getPaginatedProducts(page));
    }
  }

  private getPaginatedProducts(page: number): Product[] {
    const startIndex = (page - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  public getTotalPages(): Observable<number> {
    if (this.products.length === 0) {
      return this.getAll().pipe(
        map(() => this.calculateTotalPages())
      );
    } else {
      return of(this.calculateTotalPages());
    }
  }

  private calculateTotalPages(): number {
    return Math.ceil(this.products.length / this.productsPerPage);
  }

  public getProductsByCategory(): Observable<{ [category: string]: Product[] }> {
    if (this.products.length === 0) {
      return this.getAll().pipe(
        map(products => this.groupByCategory(products))
      );
    } else {
      return of(this.groupByCategory(this.products));
    }
  }

  private groupByCategory(products: Product[]): { [category: string]: Product[] } {
    return products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as { [category: string]: Product[] });
  }
}
