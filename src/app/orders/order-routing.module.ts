import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard], children: [
    {path: '', component: OrderListComponent, canActivate: [AuthGuard]},
    {path: 'new', component: MakeOrderComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: ':orderId', component: OrderComponent, canActivate: [AuthGuard]},
  ]},
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
