import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarouselComponent } from "../carousel/carousel.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductCartService } from '../product-cart.service';
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
    products$: Observable<Product[]> | undefined;
    currentPage: number = 1;

    constructor(private productService: ProductDataService, private cartService: ProductCartService) { }

    ngOnInit(): void {
        this.loadPage(this.currentPage);
    }

    loadPage(page: number): void {
        this.products$ = this.productService.getPage(page);
    }

    nextPage(): void {
        this.currentPage++;
        this.loadPage(this.currentPage);
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadPage(this.currentPage);
        }
    }


}