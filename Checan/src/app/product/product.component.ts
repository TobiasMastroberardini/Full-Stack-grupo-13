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
    products$: Observable<Product[]>;

    constructor(private productService: ProductDataService, private cartService: ProductCartService) {
        this.products$ = this.productService.getAll();
    }

    ngOnInit(): void { }

    addToCart(product: Product): void {
        this.cartService.addToCart(product);
    }
}