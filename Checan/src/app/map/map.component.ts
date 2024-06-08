import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  position = {
    lat: -34.681,
    lng: -58.371
  };

  label = {
    color: 'red',
    text: 'Marcador'
  };
}
