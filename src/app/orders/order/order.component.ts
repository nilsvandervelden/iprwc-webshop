import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Customer } from 'src/app/customer/customer';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderId: string;
  order: Order | undefined
  customer: Customer | undefined
  error: string = ''
  isAdmin: boolean = false

  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getAdmin()
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("orderId")) {
        this.orderId = paramMap.get("orderId");
        this.orderService.getOrderById(this.orderId).subscribe(orderData => {
          this.order = {
            _id: orderData.order._id,
            createdAt: orderData.order.createdAt,
            delivered: orderData.order.delivered,
            paid: orderData.order.paid,
            userId: orderData.order.userId,
            products: orderData.order.products
          };
          this.customer = {
            city: orderData.user.city,
            country: orderData.user.country,
            email: orderData.user.email,
            firstName: orderData.user.firstName,
            lastName: orderData.user.lastName,
            password: orderData.user.password,
            phoneNumber: orderData.user.phoneNumber,
            postalCode: orderData.user.postalCode,
            street: orderData.user.street,
            streetNumber: orderData.user.streetNumber,
            id: orderData.user._id,
          }
          console.log(orderData)
          this.customer = orderData['user'] as Customer;
          console.log(this.customer)
        });
      } else {
        this.orderId = null;
      }
    })
  }

  getAdmin() {
    this.isAdmin = this.authService.getIsAdmin();
  }

  getTotalPrice(): number {
    if(this.order) {
      let price = 0
      this.order.products.forEach(item => {
        let _item: any = item
        price += _item.price * _item.amount
      })
      return price
    }
    return 0
  }

  deleteOrder() {
    if(this.order) { 
      this.orderService.deleteOrder(this.orderId).subscribe((res: any) => {
        this.order = undefined
        this.error = 'Order got deleted, can\'t find an order with this ID anymore.'
        this.router.navigate(["../orders"]);
      }, (err: any) => {
        console.log(err)
      })
    }
  }

  togglePaid() {
    if(this.order) { 
      this.orderService.togglePaid(this.orderId).subscribe((res: any) => {
        if(this.order) 
          this.order.paid = !this.order.paid
      }, (err: any) => {
        console.log(err)
      })
    }
  }

  toggleDelivered() {
    if(this.order) {
      this.orderService.toggleDelivered(this.orderId).subscribe((res: any) => {
        if(this.order) 
          this.order.delivered = !this.order.delivered
      }, (err: any) => {
        console.log(err)
      })
    }
  }
}
