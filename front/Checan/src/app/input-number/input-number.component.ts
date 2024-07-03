import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'] // Corregir styleUrl a styleUrls
})
export class InputNumberComponent {
  @Output() quantityChange = new EventEmitter<number>();
  quantity = 1;

  increaseQuantity(): void {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}