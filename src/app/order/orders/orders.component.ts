import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Order } from '../order';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] | undefined

  constructor(private shoppingCartService: ShoppingCartService, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.authService.me().subscribe((res: any) => {
      let orderData = res['orders'] as Order[]
      this.orders = orderData
    }, err => {
      console.log(err)
    })
    
  }
}
