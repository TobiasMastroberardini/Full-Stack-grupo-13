import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLoginAdminComponent } from './home-login-admin.component';

describe('HomeLoginAdminComponent', () => {
  let component: HomeLoginAdminComponent;
  let fixture: ComponentFixture<HomeLoginAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLoginAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
