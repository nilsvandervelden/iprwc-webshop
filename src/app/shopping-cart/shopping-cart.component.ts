import { Component, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartUtil } from '../shared/shopping-cart-util';
import { ShoppingCartItem } from './shopping-cart-product.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent implements OnInit {

  productsInCart: ShoppingCartItem[];
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.productsInCart = this.shoppingCartService.getShoppingCartItems()
  }

  public onCartItemUpdated(item: ShoppingCartItem) {
    if(this.productsInCart) {
      if(item.amount < 1) { return this.removeFromCart(item)}
      for (let i = 0; i < this.productsInCart.length; i++) {
        if (this.productsInCart[i] === item) {
          this.productsInCart[i] = item;
        }
      }
      this.shoppingCartService.setCartItems(this.productsInCart)
    }
  }

  calculateItemCount() {
    if (this.productsInCart != undefined) {
      return ShoppingCartUtil.calculateTotalItemsInCart(this.productsInCart);
    }
    return 0;
  }

  removeFromCart(item: any): void {
    if(this.productsInCart) {
      for(let i = 0; i < this.productsInCart.length; i++){
        if (this.productsInCart[i] === item) {
          this.productsInCart.splice(i, 1);
        }
      }
      this.shoppingCartService.setCartItems(this.productsInCart)
    }
  }

  onClearCart() {
    if (this.productsInCart) {
      this.shoppingCartService.setCartItems([])
      this.productsInCart = []
    }
  }

  clearCart() {
    this.shoppingCartService.clearCart()
    this.productsInCart = this.shoppingCartService.getShoppingCartItems()
    window.location.reload()
  }
}
