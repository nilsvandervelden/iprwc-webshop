import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path: 'account/dashboard', component: DashboardComponent},
  {path: 'account/orders', component: OrdersComponent},
  {path: 'account/order/:orderId', component: OrderComponent},
  {path: 'account/make-order', component: MakeOrderComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule { }
