import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersAdminComponent } from './all-orders-admin.component';

describe('AllOrdersAdminComponent', () => {
  let component: AllOrdersAdminComponent;
  let fixture: ComponentFixture<AllOrdersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOrdersAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
