import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject } from 'rxjs';
import { Product } from '../products/product-model';

export class ShoppingCartService {
  public productsInCartChanged: Subject<Product[]> = new Subject<Product[]>();
  private productInCart: Product[] = [
    new Product(
      1,
      'Aang On Airscooter Vinylfiguur 541',
      17.99,
      'Avatar - The Last Airbender, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw2fcb9bda/images/4/7/5/7/475778a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      2,
      'Hermione Vinylfiguur 113',
      15.99,
      'Harry Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwedb0daed/images/4/6/0/7/460778a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
  ];

  constructor() {}

  public add(product: Product) {
    this.productInCart.push(product);
    this.productsInCartChanged.next(this.productInCart.slice());
  }

  public delete(index: number){
    this.productsInCartChanged.next(this.productInCart.slice());
  }

  public getAll(): Product[]{
    return this.productInCart.slice();
    
  }
}