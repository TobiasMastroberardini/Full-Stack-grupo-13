import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from "../input-number/input-number.component";
import { Product } from '../product/Product';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss',
  imports: [InputNumberComponent, FormsModule]
})
export class AddToCartButtonComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<{ product: Product, quantity: number }>();
  quantity: number = 1;

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onAddToCart() {
    this.addToCart.emit({ product: this.product, quantity: this.quantity });
  }
}
