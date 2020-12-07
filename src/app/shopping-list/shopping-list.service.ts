import { Subject } from 'rxjs';
import { Product } from '../products/product-model';

export class ShoppingListService {
  productChanged = new Subject<Product[]>();
  private products: Product[] = [
    new Product(
      'Sybil Trelawney Vinylfiguur 86',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/p/sybil-trelawney-vinylfiguur-86/439813.html'
    ),
    new Product(
      'Sybil Trelawney Vinylfiguur 86',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/p/sybil-trelawney-vinylfiguur-86/439813.html'
    ),
    new Product(
      'das',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/p/sybil-trelawney-vinylfiguur-86/439813.html'
    ),
    new Product(
      'fdsad',
      '13.99',
      'Potter, Funko Pop!',
      'https://www.large.nl/p/sybil-trelawney-vinylfiguur-86/439813.html'
    )
  ];

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products[index];
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productChanged.next(this.products.slice());
  }

  addProducts(products: Product[]) {
    this.products.push(...products);
    this.productChanged.next(this.products.slice());
  }

  updateProduct(index: number, newProduct: Product) {
    this.products[index] = newProduct;
    this.productChanged.next(this.products.slice());
  }
}