import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  categories: string[] = [];

  constructor(private productService: ProductDataService) { }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(
      categories => {
        this.categories = categories; // Asigna las categorías recibidas del backend al arreglo local
      },
      error => {
        console.error('Error al cargar las categorías:', error);
        // Manejar el error adecuadamente, como redirigir o mostrar un mensaje de error.
      }
    );
  }
}