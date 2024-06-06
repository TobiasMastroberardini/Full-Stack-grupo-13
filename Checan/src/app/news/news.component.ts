import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductDataService } from '../product-data.service';
import { Product } from '../product/Product';

@Component({
  selector: 'app-news',
  standalone: true,
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  imports: [ProductCardComponent]
})
export class NewsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productsDataService: ProductDataService) { }

  ngOnInit(): void {
    this.productsDataService.getAll().subscribe(products => {
      // Filtrar los productos con clearance igual a true
      this.products = products.filter(product => product.clearance);
    });
  }
}