import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product-model';
import { ShoppingCartItem } from '../shopping-cart-product.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {

  @Input() public productsInCart: ShoppingCartItem[];
  
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
      console.log('delete')
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
