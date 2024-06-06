import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from "../carousel/carousel.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductDataService } from '../product-data.service';
import { Product } from './Product';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    imports: [HttpClientModule, CommonModule, ProductCardComponent, CarouselComponent]
})
export class ProductsListComponent implements OnInit {
    products: Product[] = [];
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
