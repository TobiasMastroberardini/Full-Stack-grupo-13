import { Component, Input } from '@angular/core';
import { ProductCartService } from '../product-cart.service';
import { Product } from '../product/Product';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})
export class AddToCartButtonComponent {
  @Input() product: any;
  constructor(private cart: ProductCartService) { }

  addToCart(product: Product): void {
    this.cart.addToCart(product);
  }
}
