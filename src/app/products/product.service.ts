import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; 
import { Router } from "@angular/router";

import { Product } from './product-model';


@Injectable()
export class ProductService {
  private products: Product[] = [];
  productChanged = new Subject<Product[]>();

  constructor(private httpClient: HttpClient,
              private router: Router) {}
  
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

  getProductUpdateListener() {
    return this.productChanged.asObservable();
  }

  getProductById(id: string) {
    return this.httpClient.get<{ _id: string; vinylFigureId: number, name: string, price: number, description: string, imagePath: string }>(
      "http://localhost:3000/api/products/" + id
    );
  }

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
        this.productChanged.next([...this.products]);
        this.router.navigate(["../products/manage"]);
      });
  }

  updateProduct(id: string, vinylFigureId: number, name: string, price: number, description: string, imagePath: string) {
    const product: Product = {id: id, vinylFigureId: vinylFigureId, name: name, price: price, description: description, imagePath: imagePath};
    this.httpClient
      .put("http://localhost:3000/api/products/" + id, product)
      .subscribe(response => {
        const updatedProducts = [...this.products];
        const oldProductIndex = updatedProducts.findIndex(p => p.id === product.id);
        updatedProducts[oldProductIndex] = product;
        this.products = updatedProducts;
        this.productChanged.next([...this.products]);
        this.router.navigate(["../products/manage"]);
      }); 
  }
  
  deleteProduct(productId: string) {
    this.httpClient.delete("http://localhost:3000/api/products/" + productId)
      .subscribe(() => {
        const updatedProducts = this.products.filter(product => product.id != productId);
        this.products = updatedProducts;
        this.productChanged.next([...this.products]);
      });
  }
}