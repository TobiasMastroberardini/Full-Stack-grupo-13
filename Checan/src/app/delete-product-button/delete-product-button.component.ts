import { Component, Input } from '@angular/core';
import { ProductCartService } from '../product-cart.service';
import { Product } from '../product/Product';

@Component({
  selector: 'app-delete-product-button',
  standalone: true,
  imports: [],
  templateUrl: './delete-product-button.component.html',
  styleUrl: './delete-product-button.component.scss'
})
export class DeleteButtonComponent {
  @Input() product: any; constructor(private cart: ProductCartService) { }

  deleteFromCart(product: Product): void {
    console.log(this.product);

    this.cart.removeFromCart(product);
    product.quantity = 0;
  }
}
