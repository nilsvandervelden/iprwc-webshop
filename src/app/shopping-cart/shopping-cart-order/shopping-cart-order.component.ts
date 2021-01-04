
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartItem } from '../shopping-cart-product.model';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCartUtil } from '../../shared/shopping-cart-util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart-order',
  templateUrl: './shopping-cart-order.component.html',
  styleUrls: ['./shopping-cart-order.component.scss']
})
export class ShoppingCartOrderComponent implements OnInit {
  @Input() public shoppingCartItems: ShoppingCartItem[];
  @Input() clearCart: Function;

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router) { }

  ngOnInit(): void {
  }

  calculteCost() {
    if(this.shoppingCartItems != undefined) {
      return ShoppingCartUtil.calculateTotal(this.shoppingCartItems);
    }
    return 0;
  }

  emptyCart() {
    this.clearCart()
  }

  
  makeOrder() {
    this.router.navigate(['/account/make-order'])
  }
}
