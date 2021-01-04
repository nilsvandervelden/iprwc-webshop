
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartItem } from '../shopping-cart-product.model';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCartUtil } from '../../shared/shopping-cart-util';

@Component({
  selector: 'app-shopping-cart-order',
  templateUrl: './shopping-cart-order.component.html',
  styleUrls: ['./shopping-cart-order.component.scss']
})
export class ShoppingCartOrderComponent implements OnInit {
  @Input() public shoppingCartItems: ShoppingCartItem[];

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  calculteCost() {
    if(this.productsInShoppingCart != undefined) {
      return ShoppingCartUtil.calculateTotal(this.productsInShoppingCart);
    }
    return 0;
  }
}
