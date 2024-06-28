import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoBackComponent } from "../go-back/go-back.component";
import { ProductCartService } from '../product-cart.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  imports: [FormsModule, CommonModule, GoBackComponent]
})
export class OrderListComponent implements OnInit {
  carts: any[] = [];

  constructor(private cartService: ProductCartService) { }

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts() {
    this.cartService.getAllCarts().subscribe(
      (data) => {
        this.carts = data;
        console.log('Carritos obtenidos:', this.carts);

        this.carts.forEach(cart => {
          this.cartService.getCartItems(cart.cart_id).subscribe(
            (result) => {
              cart.items = result.items;
              cart.total = result.total;
              console.log('Items del carrito', cart.cart_id, ':', cart.items);
              console.log('Total del carrito', cart.cart_id, ':', cart.total);
            },
            (error) => {
              console.error('Error al obtener los items del carrito', cart.cart_id, ':', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error al obtener los carritos:', error);
      }
    );
  }
}