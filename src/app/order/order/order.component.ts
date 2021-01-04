import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  order: Order | undefined
  customer: Customer | undefined
  error: string = ''
  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    // this.getAdmin()
    this.route.params.subscribe((params: any) => {
      this.orderService.fetchOrder(params['orderId']).subscribe((res: any) => {
        this.order = res['Order'] as Order
        this.customer = res['Customer'] as Customer
        console.log(this.order)
      }, err => {
        this.error = 'Couldn\'t find an order with that id'
        console.log(err)
      })
    })
  }


  // getAdmin() {
  //   this.authService.check().subscribe((res: any) => {
  //     this.admin = res.admin
  //   })
  // }

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
      this.orderService.deleteOrder(this.order._id).subscribe((res: any) => {
        this.order = undefined
        this.error = 'Order got deleted, can\'t find an order with this ID anymore.'
      }, (err: any) => {
        console.log(err)
      })
    }
  }

  togglePaid() {
    if(this.order) { 
      this.orderService.togglePaid(this.order._id).subscribe((res: any) => {
        if(this.order) 
          this.order.paid = !this.order.paid
      }, (err: any) => {
        console.log(err)
      })
    }
  }

  toggleDelivered() {
    if(this.order) {
      this.orderService.toggleDelivered(this.order._id).subscribe((res: any) => {
        if(this.order) 
          this.order.delivered = !this.order.delivered
      }, (err: any) => {
        console.log(err)
      })
    }
  }
}
