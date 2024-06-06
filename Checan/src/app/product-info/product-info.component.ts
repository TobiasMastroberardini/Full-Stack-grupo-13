import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartButtonComponent } from "../add-to-cart-button/add-to-cart-button.component";
import { Product } from '../product/Product';
import { SharedStateService } from '../shared-state.service';
import { ViewProductButtonComponent } from '../view-product-button/view-product-button.component';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  standalone: true,
  styleUrls: ['./product-info.component.scss'],
  imports: [CommonModule, HttpClientModule, ProductInfoComponent, ViewProductButtonComponent, AddToCartButtonComponent]
})

export class ProductInfoComponent implements OnInit {
  product: Product | undefined;

  constructor(private router: Router, private sharedStateService: SharedStateService) { }

  ngOnInit(): void {
    this.product = this.sharedStateService.getProduct();

    if (!this.product) {
      // Manejar el caso en que no se pase el producto correctamente (ej. redireccionar o mostrar un mensaje)
      this.router.navigate(['/']); // Redirigir a la página principal o mostrar un mensaje
    }
  }
}