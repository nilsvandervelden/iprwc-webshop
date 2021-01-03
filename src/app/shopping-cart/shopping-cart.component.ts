import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../products/product-model';
import { ShoppingCartItem } from './shopping-cart-product.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public productsInCart: ShoppingCartItem[];
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.productsInCart = this.shoppingCartService.getShoppingCartItems()
  }

  public removeProductFromCart(item: ShoppingCartItem) {
    if(this.productsInCart) {
      for (let i = 0; i < this.productsInCart.length; i++) {
        if (this.productsInCart[i] === item) {
          this.productsInCart[i] = item;
        }
      }
      this.shoppingCartService.setCartItems(this.productsInCart)
    }
  }

  public incrementProductCount(index: number) {
    console.log('-')
    // this.shoppingCartService.incrementProductCount(index);
  }

  public decrementProductCount(index: number) {
    console.log('+')
    // this.shoppingCartService.decrementProductCount(index);
  }
}

