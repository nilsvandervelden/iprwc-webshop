import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem } from '../orderItem';
import Swal from 'sweetalert2';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { AuthService } from 'src/app/auth/auth.service';


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
    const productsInCart = this.shoppingCartService.getShoppingCartItems();

    const orderData = []
    for (let i = 0; i < productsInCart.length; i++) {
      const product = productsInCart[i];
      let orderProduct = {
        productId: product.product.id,
        name: product.product.name,
        price: product.product.price,
        description: product.product.description,
        imagePath: product.product.imagePath,
        amount: product.amount,
      } as OrderItem
      orderData.push(orderProduct)
    }

    console.log(orderData)

    this.shoppingCartService.createOrder(orderData).subscribe(res =>{
      this.shoppingCartService.clearCart();
      window.location.href="/account/orders"
    }, err => {
      Swal.fire('Error', 'Couldn\'t create the order. Try again (maybe clear your cart/your cart is empty)', 'error')
      console.log(err)
    })
  }
}

