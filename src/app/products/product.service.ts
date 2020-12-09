import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Product } from './product-model';


@Injectable()
export class ProductService {
  productChanged = new Subject<Product[]>();

  private products: Product[] = [
    new Product(
      1,
      'Aang On Airscooter Vinylfiguur 541',
      '17.99',
      'Avatar - The Last Airbender, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw2fcb9bda/images/4/7/5/7/475778a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      2,
      'Hermione Vinylfiguur 113',
      '15.99',
      'Harry Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwedb0daed/images/4/6/0/7/460778a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      3,
      'Draco Malfoy Vinylfiguur 117',
      '15.99',
      'Harry Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwa9b934f3/images/4/6/0/7/460783a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      4,
      'Black Light - Iron Man',
      '17.99',
      'Marvel, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw02776f8b/images/4/7/4/4/474416a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      5,
      'Empire Strikes Back 40th Anniversary - Luke Skywalker & Yoda Vinylfiguur 363',
      '15.99',
      'Star Wars, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw4c5d0b2a/images/4/5/4/2/454277a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      2,
      'Hermione Vinylfiguur 113',
      '15.99',
      'Harry Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwedb0daed/images/4/6/0/7/460778a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      3,
      'Draco Malfoy Vinylfiguur 117',
      '15.99',
      'Harry Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwa9b934f3/images/4/6/0/7/460783a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      4,
      'Black Light - Iron Man',
      '17.99',
      'Marvel, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw02776f8b/images/4/7/4/4/474416a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      5,
      'Empire Strikes Back 40th Anniversary - Luke Skywalker & Yoda Vinylfiguur 363',
      '15.99',
      'Star Wars, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw4c5d0b2a/images/4/5/4/2/454277a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {

  }

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products[index];
  }

  addProductToShoppingList(product: Product) {
    this.shoppingListService.addProduct(product);
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productChanged.next(this.products.slice());
  }

  updateProduct(index: number, newProduct: Product) {
    this.products[index] = newProduct;
    this.productChanged.next(this.products.slice());
  }
  
  deleteProduct(index: number) {
    this.products.slice(index, 1);
    this.productChanged.next(this.products.slice());
  }
}