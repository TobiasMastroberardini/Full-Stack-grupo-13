import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLoginUserComponent } from './home-login-user.component';

describe('HomeLoginUserComponent', () => {
  let component: HomeLoginUserComponent;
  let fixture: ComponentFixture<HomeLoginUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLoginUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
