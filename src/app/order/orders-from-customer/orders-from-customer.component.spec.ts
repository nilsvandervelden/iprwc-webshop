import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersFromCustomerComponent } from './orders-from-customer.component';

describe('OrdersFromCustomerComponent', () => {
  let component: OrdersFromCustomerComponent;
  let fixture: ComponentFixture<OrdersFromCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersFromCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersFromCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
