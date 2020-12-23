import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Product } from './product-model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";


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

  // getProduct(id: string) {
  //   return this.httpClient.get<{ _id: string; vinylFigureId: number, name: string, price: number, description: string, imagePath: string }>(
  //     "http://localhost:3000/api/products/" + id
  //   );
  // }

  addProduct(vinylFigureId: number, name: string, price: number, description: string, imagePath: string) {
    const product: Product = {id: null, vinylFigureId: vinylFigureId, name: name, price: price, description: description, imagePath: imagePath}
    this.httpClient
      .post<{message : string; productId: string}>(
        'http://localhost:3000/api/products',
        product
      )
      .subscribe(responseData => {
        const id = responseData.productId;
        product.id = id;
        this.products.push(product);
        this.productChanged.next(this.products.slice());
      });
  }

  updateProduct(id: string, vinylFigureId: number, name: string, price: number, description: string, imagePath: string) {
    const product: Product = {id: id, vinylFigureId: vinylFigureId, name: name, price: price, description: description, imagePath: imagePath};
    console.log(id);
    this.httpClient
      .put("http://localhost:3000/api/products/" + id, product)
      .subscribe(response => {
        const updatedProducts = [...this.products];
        const oldProductIndex = updatedProducts.findIndex(p => p.id === product.id);
        updatedProducts[oldProductIndex] = product;
        this.products = updatedProducts;
        this.productChanged.next([...this.products]);
      }); 
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