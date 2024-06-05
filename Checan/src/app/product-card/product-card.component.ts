import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: any;

}
