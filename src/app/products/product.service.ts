import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Product } from './product-model';


@Injectable()
export class ProductService {
  productChanged = new Subject<Product[]>();

  private products: Product[] = [
    new Product(
      'Sybil Trelawney Vinylfiguur 86',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw4c5d0b2a/images/4/5/4/2/454277a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      'Sybil Trelawney Vinylfiguur 86',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwfc2865ba/images/4/5/6/3/456324a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      'Sybil Trelawney Vinylfiguur 86',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwd84cefe3/images/4/5/6/3/456313a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      'Sybil Trelawney Vinylfiguur 86',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw83acc54f/images/4/8/2/3/482343a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      'Sybil Trelawney Vinylfiguur 86',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw4c5d0b2a/images/4/5/4/2/454277a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      'Sybil Trelawney Vinylfiguur 86',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwfc2865ba/images/4/5/6/3/456324a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      'Sybil Trelawney Vinylfiguur 86',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dwd84cefe3/images/4/5/6/3/456313a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    ),
    new Product(
      'Sybil Trelawney Vinylfiguur 86',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw83acc54f/images/4/8/2/3/482343a.jpg?sw=1000&sh=800&sm=fit&sfrm=png'
    )
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