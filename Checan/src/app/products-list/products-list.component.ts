import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataService } from '../product-data.service';
import { Product } from '../product/Product';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  @Input() product!: Product;
  products: Product[] = [];

  constructor(private productService: ProductDataService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      products => {
        this.products = products;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  deleteProduct(product: Product): void {
    if (product.id) {
      this.productService.deleteProductById(product.id).subscribe(
        response => {
          console.log('Product deleted successfully:', response);
          // Aquí podrías manejar el éxito de la operación, como actualizar la lista de productos.
          this.loadProducts(); // Actualizar la lista después de eliminar
        },
        error => {
          console.error('Error deleting product:', error);
          // Aquí podrías manejar el error, como mostrar un mensaje de error al usuario.
        }
      );
    } else {
      console.error('Product ID missing.'); // Manejar caso donde no hay ID
    }
  }

  redirectToEditProduct(product: Product): void {
    if (product && product.id) {
      // Redirigir al componente de edición con el ID del producto
      this.router.navigate(['/edit-product', product.id]);
    } else {
      console.error('El producto no tiene un ID válido.');
      // Manejo del error o mostrar un mensaje al usuario
    }
  }

  redirectToAddProduct(): void {
    this.router.navigate(['/add-product']);
  }

}
