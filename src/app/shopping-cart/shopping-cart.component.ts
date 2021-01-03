import { Component, Input, OnInit, Output } from '@angular/core';
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
      for (let i = 0; i < this.productsInCart.length; i++) {
        if (this.productsInCart[i] === item) {
          this.productsInCart[i] = item;
        }
      }
      this.shoppingCartService.setCartItems(this.productsInCart)
    }
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
}
