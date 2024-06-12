import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../alert.service';
import { CartStateService } from '../cart-state.service';

@Component({
  selector: 'app-alert-add-to-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-add-to-cart.component.html',
  styleUrl: './alert-add-to-cart.component.scss'
})
export class AlertAddToCartComponent implements OnInit, OnDestroy {
  message: string | null = null;
  private alertSubscription: Subscription | undefined;
  isCartOpen: boolean = false;

  constructor(private alertService: AlertService, private cartStateService: CartStateService) {
    this.isCartOpen = false;
  }

  toggleCartService() {
    this.cartStateService.toggleCart();
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }


  ngOnInit() {
    this.alertSubscription = this.alertService.alert$.subscribe(message => {
      this.message = message;
      if (message) {
        setTimeout(() => {
          this.message = null;
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }
}
