import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartButtonComponent } from "../add-to-cart-button/add-to-cart-button.component";
import { ProductCartService } from '../product-cart.service';
import { Product } from '../product/Product';
import { SharedStateService } from '../shared-state.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [CommonModule, HttpClientModule, AddToCartButtonComponent]
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(
    private router: Router,
    private sharedStateService: SharedStateService,
    private cartService: ProductCartService
  ) { }

  redirectToProductInfo(): void {
    this.sharedStateService.setProduct(this.product);
    this.router.navigate(['/product-info']);
  }

  onAddToCart(): void {
    this.cartService.addToCart({ ...this.product, quantity: 1 });
  }
}
