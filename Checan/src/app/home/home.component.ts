import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { CartComponent } from "../cart/cart.component";
import { ProductsListComponent } from "../product/product.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HttpClientModule, ProductsListComponent, CarouselComponent, CartComponent]
})
export class HomeComponent {
}
