import { Product } from '../products/product-model';

export class ShoppingCartItem {
  id: number;
  vinylFigureId: number;
  imagePath: string;
  description: string
  name: string;
  price: number;
  quantity: number;

constructor(id: number, product: Product, quantity = 1) {
  this.id = id;
  this.vinylFigureId = product.vinylFigureId;
  this.imagePath = product.imagePath;
  this.description = product.description;
  this.name = product.name;
  this.price = product.price;
  this.quantity = quantity;
  }
}