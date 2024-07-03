// shared-state.service.ts
import { Injectable } from '@angular/core';
import { Product } from './product/Product'; // Ajusta la ruta según tu estructura

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  private product: Product | undefined;

  setProduct(product: Product): void {
    this.product = product;
  }

  getProduct(): Product | undefined {
    return this.product;
  }
}
