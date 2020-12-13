import { Subject } from 'rxjs';
import { Product } from '../products/product-model';
import { ShoppingCartItem } from './shopping-cart-product.model';

export class ShoppingCartService {
  public productsInCartChanged: Subject<ShoppingCartItem[]> = new Subject<ShoppingCartItem[]>();
  private productInCart: ShoppingCartItem[] = [
    
    new ShoppingCartItem(
      541,
      new Product(
        541,
        'Aang On Airscooter Vinylfiguur 541',
        17.99,
        'Avatar - The Last Airbender, Funko Pop!',
        'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw2fcb9bda/images/4/7/5/7/475778a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
      )
    ),
    new ShoppingCartItem(
      113,
      new Product(
        113,
        'Hermione Vinylfiguur 113',
        15.99,
        'Harry Potter, Funko Pop!',
        'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwedb0daed/images/4/6/0/7/460778a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
      )
    )
  ];

  constructor() {}

  public createShoppingCartItem(product: Product) {
    const shoppingCartItem = new ShoppingCartItem (113, product);
    this.checkIfProductInShoppingList(shoppingCartItem);
    this.add(shoppingCartItem);
  }

  private checkIfProductInShoppingList(shoppingCartItem: ShoppingCartItem) {
    for(let i in this.productInCart) {
      if(this.productInCart[i].name == shoppingCartItem.name) {
        shoppingCartItem.quantity += 1;
      } else {
        this.add(shoppingCartItem);
      }
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