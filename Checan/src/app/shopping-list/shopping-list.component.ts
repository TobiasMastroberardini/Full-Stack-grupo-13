import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductCartService } from '../product-cart.service';
import { Product } from '../product/Product';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  cartList$: Observable<Product[]>;
  cartListLength: number = 0;
  private subscription: Subscription | undefined;
  user_id: number = 1;  // Ejemplo: ID de usuario, puedes manejar esto dinámicamente

  constructor(private cartService: ProductCartService) {
    this.cartList$ = this.cartService.cartList.asObservable();
  }

  ngOnInit(): void {
    this.subscription = this.cartList$.subscribe(cartList => {
      this.cartListLength = cartList.length;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createCartAndAddItems() {
    this.cartService.createCart(this.user_id).subscribe(
      response => {
        console.log('Carrito creado correctamente', response);
        const cart_id = response.cart_id;  // Obtener el cart_id del response

        // Obtener los productos desde cartList$ y agregarlos al carrito
        this.cartList$.subscribe(cartList => {
          cartList.forEach(product => {
            const product_id = product.id || 0;
            const quantity = product.quantity || 1;  // Si no se especifica la cantidad, se asume 1

            this.cartService.addCartItem(cart_id, product_id, quantity).subscribe(
              response => {
                console.log(`Producto ${product_id} agregado al carrito correctamente`, response);
                // Manejar respuesta del backend, redirección, etc.
              },
              error => {
                console.error(`Error al agregar producto ${product_id} al carrito`, error);
                // Manejar error del backend
              }
            );
          });
        });
      },
      error => {
        console.error('Error al crear carrito', error);
        // Manejar error del backend
      }
    );
  }
}