import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: Order[] | undefined
  subscription: Subscription;
  isAdmin: boolean

  constructor(private authService: AuthService,
              private orderService: OrderService) { }


ngOnInit() {
  this.isAdmin = this.authService.getIsAdmin();
  this.getData()
}

  getData() {
    if(!this.isAdmin) {
      this.authService.me().subscribe((res: any) => {
        let orderData = res['orders'] as Order[]
        this.orders = orderData
        console.log(res);
      }, err => {
        console.log(err)
      })
    } 

    if(this.isAdmin) {
      this.orderService.getOrders().subscribe((res: any) => {
        let orderData = res['orders'] as Order []
        this.orders = orderData
        console.log(res);
      }, err => {
        console.log(err)
      })
    } 
  }
}
