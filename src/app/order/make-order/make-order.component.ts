import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem } from '../../shared/model/orderItem';
import Swal from 'sweetalert2';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';


@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {
  shoppingCartData: any[] | undefined

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router) { }

  ngOnInit(): void {
    this.shoppingCartData = this.shoppingCartService.getShoppingCartItems();
  }

  makeOrderFromCart() {
    const localCartData = this.shoppingCartService.getShoppingCartItems()
    
    const orderData = []
    for (let i = 0; i < localCartData.length; i++) {
      const element = localCartData[i];
      let orderProduct = {
        productId: element.product.id,
        amount: element.amount,
      } as OrderItem
      orderData.push(orderProduct)
    }

    console.log(orderData)

    this.shoppingCartService.createOrder(orderData).subscribe(res =>{
      this.shoppingCartService.setCartItems([])
      window.location.href="/account/orders"
      // this.router.navigate(['/account/orders'])
    }, err => {
      Swal.fire('Error', 'Couldn\'t create the order. Try again (maybe clear your cart/your cart is empty)', 'error')
      console.log(err)
    })
  }
}

