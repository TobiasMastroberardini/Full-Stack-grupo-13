import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarouselComponent } from "../carousel/carousel.component";
import { ProductComponent } from "../product/product.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CarouselComponent, ProductComponent, HttpClientModule]
})
export class HomeComponent {
}
