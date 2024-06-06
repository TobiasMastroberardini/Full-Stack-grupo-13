import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductFormComponent } from './search-product-form.component';

describe('SearchProductFormComponent', () => {
  let component: SearchProductFormComponent;
  let fixture: ComponentFixture<SearchProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProductFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
