import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AllOrdersAdminComponent } from "./all-orders-admin/all-orders-admin.component";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderItemComponent } from "./order-item/order-item.component";
import { OrderRoutingModule } from "./order-routing.module";
import { OrdersFromCustomerComponent } from "./orders-from-customer/orders-from-customer.component";
import { PlaceOrderComponent } from "./place-order/place-order.component";
import { UpdateOrderStatusAdminComponent } from "./update-order-status-admin/update-order-status-admin.component";

@NgModule({
  declarations: [
    OrderItemComponent,
    OrderDetailComponent,
    AllOrdersAdminComponent,
    OrdersFromCustomerComponent,
    PlaceOrderComponent,
    UpdateOrderStatusAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    OrderRoutingModule,
    RouterModule
  ],
})
export class OrderModule { }
