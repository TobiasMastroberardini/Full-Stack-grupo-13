import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAddToCartComponent } from './alert-add-to-cart.component';

describe('AlertAddToCartComponent', () => {
  let component: AlertAddToCartComponent;
  let fixture: ComponentFixture<AlertAddToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertAddToCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertAddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
