import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
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

  constructor(private shoppingCartService: ShoppingCartService, 
              private authService: AuthService,
              private orderService: OrderService) { }


ngOnInit() {
  this.getData()
}

  getData() {
    this.authService.me().subscribe((res: any) => {
      console.log(res)
      let orderData = res['orders'] as Order[]
      this.orders = orderData
      console.log(res);
    }, err => {
      console.log(err)
    })
  }
}