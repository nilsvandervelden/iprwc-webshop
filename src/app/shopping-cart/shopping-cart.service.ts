import { Subject } from 'rxjs';
import { Product } from '../products/product-model';
import { ShoppingCartItem } from './shopping-cart-product.model';
import Swal from 'sweetalert2'


export class ShoppingCartService {
  public productsInCartChanged: Subject<ShoppingCartItem[]> = new Subject<ShoppingCartItem[]>();
  private productInCart: ShoppingCartItem[] = [];

  constructor() {}

  public onAddItemToShoppingList(product: Product) {
    const shoppingCartItem = new ShoppingCartItem (113, product);
    this.addOrIncrementProductToShoppingList(shoppingCartItem);
  }

  private addOrIncrementProductToShoppingList(shoppingCartItem: ShoppingCartItem) {
    for(let i in this.productInCart) {
      if(this.productInCart[i].name == shoppingCartItem.name) {
        this.incrementProductCount(+i);
        return
      }
    }
    this.add(shoppingCartItem);
  }

  public incrementProductCount(index: number) {
    this.productInCart[index].quantity += 1;
    this.productsInCartChanged.next(this.productInCart.slice());
  }

  public removeProductPopup(index: number) {
    Swal.fire({
      title: 'Product uit winkelwagen verwijderen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC3545',
      cancelButtonColor: '#007BFF',
      confirmButtonText: 'Verwijder'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(index)
        Swal.fire(
          'Verwijderd!',
          'Het product is uit de winkelwagen verwijderd!',
          'success'
        )
      }
    })
  }

  public decrementProductCount(index: number) {
    if(this.productInCart[index].quantity <= 1) {
      this.removeProductPopup(index);
    } else {
      this.productInCart[index].quantity -= 1;
      this.productsInCartChanged.next(this.productInCart.slice());
    }
  }

  private add(shoppingCartItem: ShoppingCartItem) {
    this.productInCart.push(shoppingCartItem);
    this.productsInCartChanged.next(this.productInCart.slice());
  }

  public delete(index: number){
    if (index > -1) {
      this.productInCart.splice(index, 1);
      this.productsInCartChanged.next(this.productInCart.slice());
    }
  }

  public getAll(): ShoppingCartItem[]{
    return this.productInCart.slice();
    
  }
}