import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartItem } from '../shopping-cart-product.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-order',
  templateUrl: './shopping-cart-order.component.html',
  styleUrls: ['./shopping-cart-order.component.scss']
})
export class ShoppingCartOrderComponent implements OnInit {
  @Input() public products: ShoppingCartItem[] = [];
  private subscription: Subscription;
  public totalPrice: number = 0;
  public orderPrice: number = 0;
  public shippingCost: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.calculteCost();
  }

  calculteCost() {
    this.subscription = this.shoppingCartService.productsInCartChanged
    .subscribe((productsInCart: ShoppingCartItem[]) => {
      this.orderPrice = 0;
      for(let i of productsInCart) {
        this.orderPrice += (i.quantity * i.price);
        this.orderPrice = +this.orderPrice.toFixed(2)
      }
      if (this.orderPrice < 30) {
        this.shippingCost = 3.95;
      } else if (this.products.length == 0) {
        this.shippingCost = 0;
      } else {
        this.shippingCost = 3.95;
      }
      this.totalPrice = this.orderPrice + this.shippingCost;
      this.totalPrice = +this.totalPrice.toFixed(2)
    });
  }

  onOrder() {
    console.log('order');
  }

}
