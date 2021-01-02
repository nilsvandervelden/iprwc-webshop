import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementPanelComponent } from './product-management-panel.component';

describe('ProductManagementPanelComponent', () => {
  let component: ProductManagementPanelComponent;
  let fixture: ComponentFixture<ProductManagementPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductManagementPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagementPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
