import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { OrderItemComponent } from "./order-item/order-item.component";
import { OrderRoutingModule } from "./order-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MakeOrderComponent } from "./make-order/make-order.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { OrderListItemComponent } from "./order-list-item/order-list-item.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrderComponent } from "./order/order.component";
import { ShoppingCartModule } from "../shopping-cart/shopping-cart.module";
import { CustomerModule } from "../customer/customer.module";
import { OrderDetailItemComponent } from "./order-detail-item/order-detail-item.component";



@NgModule({
  imports: [
    CustomerModule,
    ShoppingCartModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    OrderRoutingModule,
    RouterModule,
  ],
  declarations: [
    DashboardComponent,
    MakeOrderComponent,
    OrderItemComponent,
    OrderListItemComponent,
    OrderSummaryComponent,
    OrdersComponent,
    OrderDetailItemComponent
  ],
})
export class OrderModule { }
