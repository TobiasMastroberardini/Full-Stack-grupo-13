import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product/Product';
import { SharedStateService } from '../shared-state.service';

@Component({
  selector: 'app-view-product-button',
  standalone: true,
  imports: [],
  templateUrl: './view-product-button.component.html',
  styleUrl: './view-product-button.component.scss'
})
export class ViewProductButtonComponent {
  @Input()
  product!: Product;

  constructor(private router: Router, private sharedStateService: SharedStateService) { }

  redirectToProductInfo(): void {
    this.sharedStateService.setProduct(this.product);
    this.router.navigate(['/product-info']);
  }
}
