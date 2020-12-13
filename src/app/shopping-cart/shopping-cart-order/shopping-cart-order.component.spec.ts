import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartOrderComponent } from './shopping-cart-order.component';

describe('ShoppingCartOrderComponent', () => {
  let component: ShoppingCartOrderComponent;
  let fixture: ComponentFixture<ShoppingCartOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
