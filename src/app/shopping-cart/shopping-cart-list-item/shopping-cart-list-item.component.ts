import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartItem } from '../shopping-cart-product.model';

@Component({
  selector: 'app-shopping-cart-list-item',
  templateUrl: './shopping-cart-list-item.component.html',
  styleUrls: ['./shopping-cart-list-item.component.scss']
})
export class ShoppingCartListItemComponent implements OnInit {

  amount = 1;
  @Input() public shoppingCartItem: ShoppingCartItem | any;
  @Output() public remove: EventEmitter<number> = new EventEmitter<number>();
  @Output() updated: EventEmitter<ShoppingCartItem> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
    if(this.shoppingCartItem) {
      this.amount = this.shoppingCartItem.amount
    }
  }
  public removeFromCart() {
    this.remove.emit(this.shoppingCartItem);
  }

  updateAmount(newAmount: number) {
    this.shoppingCartItem.amount = newAmount
    this.updated.emit(this.shoppingCartItem)
  }
}
