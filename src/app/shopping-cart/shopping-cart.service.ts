import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../products/product-model';
import { ShoppingCartItem } from './shopping-cart-product.model';
import Swal from 'sweetalert2'


export class ShoppingCartService {
  public cartSubject = new BehaviorSubject(this.getShoppingCartItems());
  constructor() {}

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

  // public removeProductPopup(index: number) {
  //   Swal.fire({
  //     title: 'Product uit winkelwagen verwijderen?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#DC3545',
  //     cancelButtonColor: '#007BFF',
  //     confirmButtonText: 'Verwijder'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.delete(index)
  //       Swal.fire(
  //         'Verwijderd!',
  //         'Het product is uit de winkelwagen verwijderd!',
  //         'success'
  //       )
  //     }
  //   })
  // }

    //   const shoppingCartItem = new ShoppingCartItem (113, product);
  //   this.addOrIncrementProductToShoppingList(shoppingCartItem);
  // }

  // private addOrIncrementProductToShoppingList(shoppingCartItem: ShoppingCartItem) {
  //   for(let i in this.productInCart) {
  //     if(this.productInCart[i].name == shoppingCartItem.name) {
  //       this.incrementProductCount(+i);
  //       return
  //     }
  //   }
  //   this.add(shoppingCartItem);
  // }

  // public incrementProductCount(index: number) {
  //   this.productInCart[index].quantity += 1;
  //   this.productsInCartChanged.next(this.productInCart.slice());
  // }

  // public decrementProductCount(index: number) {
  //   if(this.productInCart[index].quantity <= 1) {
  //     this.removeProductPopup(index);
  //   } else {
  //     this.productInCart[index].quantity -= 1;
  //     this.productsInCartChanged.next(this.productInCart.slice());
  //   }
  // }

  // private add(shoppingCartItem: ShoppingCartItem) {
  //   this.productInCart.push(shoppingCartItem);
  //   this.productsInCartChanged.next(this.productInCart.slice());
  // }

  // public delete(index: number){
  //   if (index > -1) {
  //     this.productInCart.splice(index, 1);
  //     this.productsInCartChanged.next(this.productInCart.slice());
  //   }
  // }

  // public getAll(): ShoppingCartItem[]{
  //   return this.productInCart.slice();
  // }

  
  setCartItems(items: ShoppingCartItem[]) {
    localStorage.setItem('shoppingCartItems', JSON.stringify(items));
    this.cartSubject.next(items)
  }
  
  clearShoppingCart() {
    localStorage.removeItem('shoppingCartItems')
    this.cartSubject.next([])
  }
}