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
      13.99,
      'Potter, Funko Pop!',
      'https://www.large.nl/p/sybil-trelawney-vinylfiguur-86/439813.html'
    ),
    new Product(
      'Sybil Trelawney Vinylfiguur 86',
      13.99,
      'Potter, Funko Pop!',
      'https://www.large.nl/p/sybil-trelawney-vinylfiguur-86/439813.html'
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