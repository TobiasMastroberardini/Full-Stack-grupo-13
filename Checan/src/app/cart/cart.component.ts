import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartStateService } from '../cart-state.service';
import { DeleteButtonComponent } from "../delete-product-button/delete-product-button.component";
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductCartService } from '../product-cart.service';
import { Product } from '../product/Product';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [HttpClientModule, DeleteButtonComponent, ProductCardComponent, CommonModule]
})
export class CartComponent implements OnDestroy {
  cartList$: Observable<Product[]>;
  isOpen = false;
  private cartOpenSubscription: Subscription;

  constructor(private cartStateService: CartStateService, private cartService: ProductCartService) {
    this.cartList$ = this.cartService.cartList.asObservable();
    this.cartOpenSubscription = this.cartStateService.isCartOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  toggleCart() {
    this.cartStateService.toggleCart();
  }

  ngOnDestroy() {
    this.cartOpenSubscription.unsubscribe();
  }
}