import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementItemComponent } from './product-management-item.component';

describe('ProductManagementItemComponent', () => {
  let component: ProductManagementItemComponent;
  let fixture: ComponentFixture<ProductManagementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManagementItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
