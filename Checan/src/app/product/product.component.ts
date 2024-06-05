import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductCartService } from '../product-cart.service';
import { ProductDataService } from '../product-data.service';
import { Product } from './Product';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    imports: [HttpClientModule, CommonModule, ProductCardComponent]
})
export class ProductComponent {

    products: Product[] = [];

    constructor(private productDataService: ProductDataService, private cart: ProductCartService) { }

    ngOnInit(): void {
        this.productDataService.getAll().subscribe(products => this.products = products)
    }
}
