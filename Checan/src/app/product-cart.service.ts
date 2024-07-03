// product-cart.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertService } from './alert.service';
import { Product } from './product/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {
  private _cartList: Product[] = [];
  cartList: BehaviorSubject<Product[]> = new BehaviorSubject(this._cartList);

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private alertService: AlertService, private http: HttpClient) {
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

    this.alertService.showAlert('Producto agregado al carrito');
    console.log("agregado");
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

  getAllCarts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/carritos`);
  }

  getCartItems(cart_id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/carritos/${cart_id}/items`);
  }

  createCart(user_id: number): Observable<any> {
    const body = { user_id };
    return this.http.post<any>(`${this.apiUrl}/carritos`, body);
  }

  addCartItem(cart_id: number, product_id: number, quantity: number): Observable<any> {
    const body = { product_id, quantity };
    return this.http.post<any>(`${this.apiUrl}/carritos/${cart_id}/items`, body);
  }
}
