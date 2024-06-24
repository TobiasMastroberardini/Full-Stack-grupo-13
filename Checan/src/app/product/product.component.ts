import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CarouselComponent } from "../carousel/carousel.component";
import { PreviusAndNextComponent } from "../previus-and-next/previus-and-next.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductDataService } from '../product-data.service';
import { Product } from './Product';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    imports: [HttpClientModule, CommonModule, ProductCardComponent, CarouselComponent, PreviusAndNextComponent]
})
export class ProductsListComponent implements OnInit {
    products$: Observable<Product[]> | undefined;
    currentPage: number = 1;
    totalPages: number = 1;

    constructor(private productService: ProductDataService) { }

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

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadPage(this.currentPage);
    }
}
