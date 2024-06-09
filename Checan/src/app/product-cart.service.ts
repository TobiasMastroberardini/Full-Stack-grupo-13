import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {

  private _cartList: Product[] = [];
  cartList: BehaviorSubject<Product[]> = new BehaviorSubject(this._cartList);

  constructor() {
    this._cartList = this.getCartFromLocalStorage();
    this.cartList.next(this._cartList);
  }

  addToCart(product: Product) {
    let item: Product | undefined = this._cartList.find((v1) => v1.name === product.name);
    if (!item) {
      this._cartList.push({ ...product });
    } else {
      item.quantity += product.quantity;
    }
    this.saveCartToLocalStorage();
    this.cartList.next(this._cartList);
  }

  removeFromCart(product: Product) {
    let index = this._cartList.findIndex((item) => item.name === product.name);

    if (index !== -1) {
      this._cartList.splice(index, 1);
    }
    this.saveCartToLocalStorage();
    this.cartList.next(this._cartList);
  }

  private saveCartToLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(this._cartList));
    }
  }

  private getCartFromLocalStorage(): Product[] {
    if (typeof localStorage !== 'undefined') {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }
}