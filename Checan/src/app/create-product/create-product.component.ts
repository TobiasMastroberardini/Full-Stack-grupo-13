import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductDataService } from '../product-data.service';
import { Product } from '../product/Product';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {

  newProduct: Product = {
    name: '',
    price: 0,
    description: '',
    image: '',
    clearance: false,
    quantity: 0,
    stock: 0,
    url: '',
    category: '',
    openPackage: 0
  };

  constructor(private productService: ProductDataService) { }

  onSubmit() {
    this.productService.addProduct(this.newProduct).subscribe(
      response => {
        console.log('Producto creado correctamente:', response);
        // Aquí podrías manejar el éxito de la operación, como redirigir o mostrar un mensaje de éxito.
      },
      error => {
        console.error('Error al crear el producto:', error);
        // Aquí podrías manejar el error, como mostrar un mensaje de error al usuario.
      }
    );
  }
}