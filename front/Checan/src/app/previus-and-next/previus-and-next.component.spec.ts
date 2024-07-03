import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviusAndNextComponent } from './previus-and-next.component';

describe('PreviusAndNextComponent', () => {
  let component: PreviusAndNextComponent;
  let fixture: ComponentFixture<PreviusAndNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviusAndNextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviusAndNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
