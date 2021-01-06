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
import { ShoppingCartModule } from "../shopping-cart/shopping-cart.module";
import { CustomerModule } from "../customer/customer.module";
import { OrderDetailItemComponent } from "./order-detail-item/order-detail-item.component";
import { BrowserModule } from "@angular/platform-browser";
import { OrderComponent } from "./order/order.component";



@NgModule({
  declarations: [
    DashboardComponent,
    MakeOrderComponent,
    OrderItemComponent,
    OrderListItemComponent,
    OrderSummaryComponent,
    OrdersComponent,
    OrderComponent,
    OrderDetailItemComponent
  ],
  imports: [
    CustomerModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    OrderRoutingModule,
    ShoppingCartModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class OrderModule { }
