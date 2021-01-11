import { BehaviorSubject, Subject } from 'rxjs';
import { ShoppingCartItem } from './shopping-cart-product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + "/order/";

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  public cartSubject = new BehaviorSubject(this.getShoppingCartItems());

  constructor(private httpClient: HttpClient) {}

  public getShoppingCartItems(): ShoppingCartItem[] {
    try {
      const cartItems = localStorage.getItem('shoppingCartItems')
      const items = JSON.parse(<string>cartItems) as ShoppingCartItem[];

      if(!items) {
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
        localStorage.setItem('shoppingCartItems', JSON.stringify(currentShoppingCartItems));
        this.cartSubject.next(currentShoppingCartItems)

        Swal.fire({
          icon: 'success',
          title: 'You did it!',
          text: 'Product was added to your cart',
        })
        
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
    return this.httpClient.post(BACKEND_URL, {orderProducts: order})
  }
}