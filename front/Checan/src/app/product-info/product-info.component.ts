import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AddToCartButtonComponent } from "../add-to-cart-button/add-to-cart-button.component";
import { GoBackComponent } from "../go-back/go-back.component";
import { ProductCartService } from '../product-cart.service';
import { ProductDataService } from '../product-data.service';
import { Product } from '../product/Product';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  standalone: true,
  styleUrls: ['./product-info.component.scss'],
  imports: [CommonModule, HttpClientModule, ProductInfoComponent, AddToCartButtonComponent, GoBackComponent]
})

export class ProductInfoComponent implements OnInit {
  product$: Observable<Product> | undefined;

  constructor(
    private productService: ProductDataService,
    private route: ActivatedRoute,
    private cartService: ProductCartService
  ) { }

  ngOnInit(): void {
    const productId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (productId) {
      this.product$ = this.productService.getProductById(productId);
    }
  }

  onAddToCart(event: { product: Product, quantity: number }) {
    const { product, quantity } = event;
    this.cartService.addToCart({ ...product, quantity });
  }
}
