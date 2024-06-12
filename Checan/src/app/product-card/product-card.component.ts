import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCartService } from '../product-cart.service';
import { Product } from '../product/Product';
import { SharedStateService } from '../shared-state.service';
import { ViewProductButtonComponent } from "../view-product-button/view-product-button.component";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ViewProductButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
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
