import { Component } from '@angular/core';
import { CartComponent } from "../cart/cart.component";
import { SearchProductFormComponent } from "../search-product-form/search-product-form.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [SearchProductFormComponent, CartComponent]
})
export class NavbarComponent {

}