import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertAddToCartComponent } from "./alert-add-to-cart/alert-add-to-cart.component";
import { CartComponent } from "./cart/cart.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HttpClientModule, HeaderComponent, FooterComponent, CartComponent, AlertAddToCartComponent]
})
export class AppComponent {
  title = 'Checan';
}
