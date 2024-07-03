import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoBackComponent } from "../go-back/go-back.component";
import { ProductDataService } from '../product-data.service';
import { Product } from '../product/Product';


@Component({
  selector: 'app-edit-product',
  standalone: true,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
  imports: [CommonModule, FormsModule, GoBackComponent]
})
export class EditProductComponent implements OnInit {
  productId: number | undefined;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductDataService
  ) { }

  ngOnInit(): void {
    this.productId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(
        product => {
          this.product = product;
        },
        error => {
          console.error('Error fetching product:', error);
          // Aquí podrías manejar el error, por ejemplo, redirigir a una página de error.
        }
      );
    } else {
      // Manejo de caso donde no se encuentra el ID, por ejemplo, redirigir a una página de error.
    }
  }

  saveProduct(): void {
    if (this.product) {
      this.productService.updateProduct(this.product).subscribe(
        updatedProduct => {
          console.log('Producto actualizado correctamente:', updatedProduct);

          // Aquí podrías manejar el éxito de la operación, como redirigir o mostrar un mensaje de éxito.
          this.router.navigate(['/products']); // Redirigir a la lista de productos después de editar
        },
        error => {
          console.error('Error al actualizar el producto:', error);
          // Aquí podrías manejar el error, como mostrar un mensaje de error al usuario.
        }
      );
    }
  }
}