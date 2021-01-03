import { ShoppingCartItem } from "../shopping-cart/shopping-cart-product.model";

export class ShoppingCartUtil {
  static calculateTotal(items: ShoppingCartItem[]) {
    let totalAmount = 0;
    for (let i = 0; i < items.length; i++) {
      const cartItem = items[i];
      totalAmount += cartItem.amount * cartItem.product.price
    }

    return totalAmount
  }
}