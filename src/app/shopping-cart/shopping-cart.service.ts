import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../products/product-model';
import { ShoppingCartItem } from './shopping-cart-product.model';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {
  public cartSubject = new BehaviorSubject(this.getShoppingCartItems());

  constructor(private httpClient: HttpClient) {}

  public getShoppingCartItems(): any[] {
    try {
      const cartItems = localStorage.getItem('shoppingCartItems')
      const items = JSON.parse(<string>cartItems) as ShoppingCartItem[];

      if(items === null) {
        return []
      }
      return items
    }
    // When there are no current products catch this.
    catch(error) {
      return []
    }
  }

  public onAddItemToShoppingList(item: ShoppingCartItem): boolean {
    try {
      //get added products from local storage
      let currentShoppingCartItems = this.getShoppingCartItems();

      //If product aleardy in cart do this:
      const existingProductIndex = currentShoppingCartItems.findIndex(
        (cartItem) => cartItem.product.id == item.product.id)

        if (existingProductIndex !== -1) {
          currentShoppingCartItems[existingProductIndex].amount += item.amount
        } else {
          currentShoppingCartItems.push(item)
        }
        console.log(item);
        localStorage.setItem('shoppingCartItems', JSON.stringify(currentShoppingCartItems));
        this.cartSubject.next(currentShoppingCartItems)
        return true
      } catch(error) {
        return false
      }
    }
  
  setCartItems(items: ShoppingCartItem[]) {
    localStorage.setItem('shoppingCartItems', JSON.stringify(items));
  }

  clearCart() {
    localStorage.setItem('shoppingCartItems', JSON.stringify([]))
  }

  createOrder(order: any) {
    return this.httpClient.post('order/create', {
      products: order
    })
  }
}