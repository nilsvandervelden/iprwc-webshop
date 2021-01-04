import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'src/app/shopping-cart/shopping-cart-product.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  @Input() productsInShoppingCart: ShoppingCartItem[] | undefined
  @Input() makeOrderFromCart: Function | any;


  constructor() { }

  ngOnInit(): void {
  }

  getTotalPrice(): string {
    if(this.productsInShoppingCart) {
      let price = 0
      this.productsInShoppingCart.forEach(item => {
        let _item: any = item
        price += _item.product.price * _item.amount
      })
      return price.toFixed(2)
    }
    return '0'
  }

  countProducts(): number {
    if(this.productsInShoppingCart) {
      let itemCount = 0
      this.productsInShoppingCart.forEach(item => {
        itemCount += item.amount
      })
      return itemCount
    }
    return 0
  }

  placeOrder() {
    this.makeOrderFromCart()
  }
}
