import { Product } from '../products/product-model';
export interface ShoppingCartItem {
  product: Product
  amount: number
}
