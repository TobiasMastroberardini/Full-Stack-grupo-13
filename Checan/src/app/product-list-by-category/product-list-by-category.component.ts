import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductDataService } from '../product-data.service';
import { Product } from '../product/Product';

@Component({
  selector: 'app-product-list-by-category',
  standalone: true,
  templateUrl: './product-list-by-category.component.html',
  styleUrl: './product-list-by-category.component.scss',
  imports: [CommonModule, ProductCardComponent]
})
export class ProductListByCategoryComponent implements OnInit {
  productsByCategory: { [category: string]: Product[] } = {};

  constructor(private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.productDataService.getProductsByCategory().subscribe(productsByCategory => {
      this.productsByCategory = productsByCategory;
    });
  }

  getCategories(): string[] {
    return Object.keys(this.productsByCategory);
  }
}
