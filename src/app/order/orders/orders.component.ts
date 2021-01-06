import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from '../order';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] | undefined
  subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService, 
              private authService: AuthService,
              private orderService: OrderService) { }


ngOnInit() {
  this.orderService.getOrders();
  this.subscription = this.orderService.orderChanged
  .subscribe(
    (orders: Order[]) => {
      this.orders = orders;
    }
  );
}

  // ngOnInit(): void {
  //   this.orderService.getOrders();
  //   this.subscription = this.productService.productChanged
  //   .subscribe(
  //     (products: Product[]) => {
  //       this.products = products;
  //     });
  // }
  //   this.getData()
  // }

  // getData() {
  //   this.authService.me().subscribe((res: any) => {
  //     let orderData = res['orders'] as Order[]
  //     this.orders = orderData
  //     console.log(res);
  //   }, err => {
  //     console.log(err)
  //   })
  // }
}
