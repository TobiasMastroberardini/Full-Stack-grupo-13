import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
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
  products$: Observable<Product[]> | undefined;
  currentPage: number = 1;
  totalPages: number = 1;

  products: Product[] = [];

  constructor(private productService: ProductDataService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      // Filtrar los productos con clearance igual a true
      this.products = products.filter(product => product.clearance);
    });
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