import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddToCartButtonComponent } from "../add-to-cart-button/add-to-cart-button.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductDataService } from '../product-data.service';
import { Product } from '../product/Product';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  imports: [CommonModule, ProductCardComponent, AddToCartButtonComponent]
})
export class CarouselComponent {
  @Input() products: Product[] = [];

  cart: any;
  productChunks: Product[][] = [];
  chunkSize: number = 4; // Default chunk size

  constructor(private productsDataService: ProductDataService) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.setChunkSize();
      this.productsDataService.getAll().subscribe(products => {
        this.products = products;
        this.chunkProducts();
      });
    }
  }


  setChunkSize(): void {
    const windowSize = window.innerWidth;
    if (windowSize < 576) { // Extra small screens
      this.chunkSize = 1;
    } else if (windowSize < 768) { // Small screens
      this.chunkSize = 3;
    } else { // Medium and larger screens
      this.chunkSize = 4;
    }
  }


  chunkProducts(): void {
    for (let i = 0; i < this.products.length; i += this.chunkSize) {
      this.productChunks.push(this.products.slice(i, i + this.chunkSize));
    }
  }
}