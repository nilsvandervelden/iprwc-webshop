import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOrdersAdminComponent } from './all-orders-admin/all-orders-admin.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersFromCustomerComponent } from './orders-from-customer/orders-from-customer.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  {path: 'place-order', component: PlaceOrderComponent},
  {path: 'all', component: AllOrdersAdminComponent},
  {path: 'detail/:orderId', component: OrderDetailComponent},
  {path: 'orders', component: OrdersFromCustomerComponent},
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
