import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartButtonComponent } from "../add-to-cart-button/add-to-cart-button.component";
import { CartComponent } from "../cart/cart.component";
import { ProductInfoComponent } from "../product-info/product-info.component";
import { SharedStateService } from '../shared-state.service';
import { ViewProductButtonComponent } from "../view-product-button/view-product-button.component";

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  imports: [CommonModule, HttpClientModule, ProductInfoComponent, ViewProductButtonComponent, CartComponent, AddToCartButtonComponent]
})
export class ProductCardComponent {

  @Input() product: any;
  // finalizePurchase(){}
  constructor(private router: Router, private sharedStateService: SharedStateService) { }

  redirectToProductInfo(): void {
    this.sharedStateService.setProduct(this.product);
    this.router.navigate(['/product-info']);
  }
}





