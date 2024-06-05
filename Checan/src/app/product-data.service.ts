import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from './product/Product';

const URL = 'https://665665b99f970b3b36c540ce.mockapi.io/api/v1/products';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private Http: HttpClient) { }

  public getAll(): Observable<Product[]> {
    return this.Http.get<Product[]>(URL).pipe(
      tap((products: Product[]) => products.forEach(product => product.quantity = 0))
    );
  }
}
