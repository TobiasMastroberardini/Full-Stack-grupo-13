import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartButtonComponent } from "../add-to-cart-button/add-to-cart-button.component";

import { ProductCartService } from '../product-cart.service';
import { ProductInfoComponent } from "../product-info/product-info.component";
import { Product } from '../product/Product';
import { SharedStateService } from '../shared-state.service';
import { ViewProductButtonComponent } from "../view-product-button/view-product-button.component";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductInfoComponent, ViewProductButtonComponent, AddToCartButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {

  @Input() product!: Product;
  // finalizePurchase(){}
  constructor(private router: Router, private sharedStateService: SharedStateService, private cart: ProductCartService) { }

  redirectToProductInfo(): void {
    this.sharedStateService.setProduct(this.product);
    this.router.navigate(['/product-info']);
  }
  addToCart(product: Product): void {
    this.cart.addToCart(product);
  }
}






