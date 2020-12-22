import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Product } from './product-model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 


@Injectable()
export class ProductService {
  productChanged = new Subject<Product[]>();

  private products: Product[] = [];

  constructor(private shoppingListService: ShoppingCartService,
              private httpClient: HttpClient) {

  }

  getProducts() {
    this.httpClient
      .get<{message: string, products: any }>(
        'http://localhost:3000/api/products'
      )
      .pipe(map((productData) => {
        return productData.products.map(product => {
          return {
            id: product._id,
            vinylFigureId: product.vinylFigureId,
            name: product.name,
            price: product.price,
            description: product.description,
            imagePath: product.imagePath
          }
        });
      }))
      .subscribe((transformedProduct) => {
        this.products = transformedProduct;
        this.productChanged.next([...this.products])
      });
  }

  getProduct(index: number) {
    return this.products[index];
  }

  // addProductToShoppingList(product: Product) {
  //   this.shoppingListService.addProduct(product);
  // }

  addProduct(product: Product) {
    this.httpClient
      .post<{message:string}>('http://localhost:3000/api/products', product)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.products.push(product);
        this.productChanged.next(this.products.slice());
      });
  }

  updateProduct(index: number, newProduct: Product) {
    const product: Product = newProduct;
    console.log(product.id);
    // this.products[index] = newProduct;
    // console.log(newProduct.id);
    // this.productChanged.next(this.products.slice());
  }
  
  deleteProduct(productId: string) {
    console.log('dit werkt')
    this.httpClient.delete("http://localhost:3000/api/products/" + productId)
      .subscribe(() => {
        const updatedProducts = this.products.filter(product => product.id != productId);
        this.products = updatedProducts;
        this.productChanged.next([...this.products]);
      });
  }
}