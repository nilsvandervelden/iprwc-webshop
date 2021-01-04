import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderItemComponent } from "./order-item/order-item.component";
import { OrderRoutingModule } from "./order-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MakeOrderComponent } from "./make-order/make-order.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { OrderListItemComponent } from "./order-list-item/order-list-item.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrderComponent } from "./order/order.component";

@NgModule({
  declarations: [
    DashboardComponent,
    MakeOrderComponent,
    OrderDetailComponent,
    OrderItemComponent,
    OrderListItemComponent,
    OrderSummaryComponent,
    OrdersComponent,
    OrderComponent
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
