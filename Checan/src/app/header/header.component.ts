import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartStateService } from '../cart-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule]
})
export class HeaderComponent {
  isCartOpen: boolean = false;
  isMenuOpen = false;

  constructor(private cartStateService: CartStateService) {
    this.isCartOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleCartService() {
    this.cartStateService.toggleCart();
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  ngOnInit(): void {
  }
}
