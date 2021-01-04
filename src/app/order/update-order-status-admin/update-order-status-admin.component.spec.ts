import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderStatusAdminComponent } from './update-order-status-admin.component';

describe('UpdateOrderStatusAdminComponent', () => {
  let component: UpdateOrderStatusAdminComponent;
  let fixture: ComponentFixture<UpdateOrderStatusAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrderStatusAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrderStatusAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
