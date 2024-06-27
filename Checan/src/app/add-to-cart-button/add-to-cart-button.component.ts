import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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

  @ViewChild(InputNumberComponent) inputNumberComponent!: InputNumberComponent;

  quantity = 1;

  onQuantityChange(quantity: number): void {
    this.quantity = quantity;
  }
  onAddToCart() {
    const quantity = this.inputNumberComponent.quantity;
    this.addToCart.emit({ product: this.product, quantity });
    // this.inputNumberComponent.reset(); // Opcional: restablecer el valor de quantity en InputNumberComponent
  }
}