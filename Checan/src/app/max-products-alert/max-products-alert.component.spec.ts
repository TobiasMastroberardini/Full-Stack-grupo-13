import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxProductsAlertComponent } from './max-products-alert.component';

describe('MaxProductsAlertComponent', () => {
  let component: MaxProductsAlertComponent;
  let fixture: ComponentFixture<MaxProductsAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxProductsAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxProductsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
