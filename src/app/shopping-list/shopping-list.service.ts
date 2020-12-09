import { Subject } from 'rxjs';
import { Product } from '../products/product-model';

export class ShoppingListService {
  productChanged = new Subject<Product[]>();
  private products: Product[] = [

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