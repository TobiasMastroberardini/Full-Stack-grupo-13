import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartStateService } from '../cart-state.service';
import { CartComponent } from "../cart/cart.component";
import { SearchProductFormComponent } from "../search-product-form/search-product-form.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [SearchProductFormComponent, CartComponent, CommonModule, FormsModule]
})
export class NavbarComponent {

  isOpen: boolean = false;
  constructor(private cartStateService: CartStateService) {
    this.isOpen = false;
  }

  toggleCart() {
    this.cartStateService.toggleCart();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {
  }
}