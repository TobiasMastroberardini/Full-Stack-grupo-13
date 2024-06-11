import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'] // Corregir styleUrl a styleUrls
})
export class InputNumberComponent {

}