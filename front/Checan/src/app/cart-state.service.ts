import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  private _isCartOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isCartOpen$ = this._isCartOpen.asObservable();

  constructor() { }

  toggleCart() {
    this._isCartOpen.next(!this._isCartOpen.value);
  }
}
