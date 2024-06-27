import { Component } from '@angular/core';
import { GoBackComponent } from "../go-back/go-back.component";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  imports: [GoBackComponent]
})
export class PageNotFoundComponent {

}
