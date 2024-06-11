import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  products: Product[] = [];
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setChunkSize();
    this.chunkProducts();
  }

  setChunkSize(): void {
    const windowSize = window.innerWidth;
    if (windowSize < 1000 && windowSize > 768) { // Medium screens
      this.chunkSize = 3;
    } else if (windowSize <= 768 && windowSize > 576) { // Small screens
      this.chunkSize = 2;
    } else if (windowSize <= 576) { // Extra small screens
      this.chunkSize = 1;
    } else { // Large screens
      this.chunkSize = 4;
    }
  }

  chunkProducts(): void {
    this.productChunks = [];
    for (let i = 0; i < this.products.length; i += this.chunkSize) {
      this.productChunks.push(this.products.slice(i, i + this.chunkSize));
    }
  }

}