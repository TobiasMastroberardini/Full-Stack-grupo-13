import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CarouselComponent } from "../carousel/carousel.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductCartService } from '../product-cart.service';
import { ProductDataService } from '../product-data.service';
import { Product } from './Product';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    imports: [HttpClientModule, CommonModule, ProductCardComponent, CarouselComponent]
})
export class ProductsListComponent implements OnInit {
    products$: Observable<Product[]> | undefined;
    currentPage: number = 1;
    totalPages: number = 1;

    constructor(private productService: ProductDataService, private cartService: ProductCartService) { }

    ngOnInit(): void {
        this.loadTotalPages();
        this.loadPage(this.currentPage);
    }

    loadPage(page: number): void {
        this.products$ = this.productService.getPage(page);
    }

    loadTotalPages(): void {
        this.productService.getTotalPages().pipe(
            tap(totalPages => this.totalPages = totalPages)
        ).subscribe();
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.loadPage(this.currentPage);
        } else {
            console.log("No hay más productos disponibles.");
        }
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadPage(this.currentPage);
        }
    }
}
