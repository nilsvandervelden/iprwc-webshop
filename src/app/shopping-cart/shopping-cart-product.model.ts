import { Product } from '../products/product-model';

export class shoppingListItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;

constructor(id: number, product: Product, quantity = 1) {
  this.id = id;
  this.productId = product.id;
  this.productName = product.name;
  this.price = product.price;
  this.quantity = quantity;
  }
}