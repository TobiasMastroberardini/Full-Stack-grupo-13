import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertService } from '../alert.service';
import { ErrorAlertComponent } from "../error-alert/error-alert.component";
import { GoBackComponent } from "../go-back/go-back.component";
import { ProductDataService } from '../product-data.service';
import { Product } from '../product/Product';

@Component({
  selector: 'app-create-product',
  standalone: true,
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  imports: [FormsModule, GoBackComponent, CommonModule, ErrorAlertComponent]
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

  showErrorAlert: boolean = false;
  errorMessage: string = 'Error';

  constructor(private productService: ProductDataService, private alertService: AlertService) { }

  onSubmit(productForm: NgForm) {
    if (productForm.invalid) {
      this.alertService.showAlert('Por favor, completa todos los campos requeridos antes de enviar.');
      return;
    }
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