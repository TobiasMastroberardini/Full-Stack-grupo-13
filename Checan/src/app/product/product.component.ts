import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CarouselComponent } from "../carousel/carousel.component";
import { CategoryListComponent } from '../category-list/category-list.component';
import { PreviusAndNextComponent } from "../previus-and-next/previus-and-next.component";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductDataService } from '../product-data.service';
import { Product } from './Product';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    imports: [HttpClientModule, CategoryListComponent, CommonModule, ProductCardComponent, CarouselComponent, PreviusAndNextComponent]
})

export class ProductComponent implements OnInit {
    products$: Observable<Product[]> | undefined;
    currentPage = 1;
    totalPages = 1;
    selectedCategory: string | undefined;

    constructor(
        private productService: ProductDataService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        // Observa los cambios en el parámetro de la ruta 'categoryName'
        this.route.paramMap.subscribe(params => {
            const categoryName = params.get('categoryName');
            if (categoryName) {
                this.selectedCategory = categoryName;
                this.loadTotalPages();
                this.loadPage(this.currentPage);
            } else {
                this.selectedCategory = undefined;
                this.loadTotalPages();
                this.loadPage(this.currentPage);
            }
        });
    }

    loadPage(page: number): void {
        if (this.selectedCategory) {
            this.products$ = this.productService.getProductsByCategory(this.selectedCategory);
        } else {
            this.products$ = this.productService.getPage(page);
        }
    }

    loadTotalPages(): void {
        if (this.selectedCategory) {
            this.products$ = this.productService.getProductsByCategory(this.selectedCategory).pipe(
                tap(products => this.totalPages = Math.ceil(products.length / 10))
            );
        } else {
            this.productService.getTotalPages().pipe(
                tap(totalPages => this.totalPages = totalPages)
            ).subscribe();
        }
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadPage(this.currentPage);
    }
}