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
  @Output() public increment: EventEmitter<number> = new EventEmitter<number>();
  @Output() public decrement: EventEmitter<number> = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
    if(this.shoppingCartItem) {
      this.amount = this.shoppingCartItem.amount
    }
  }

  public incrementProductCount() {
    this.increment.emit(this.shoppingCartItem);
  }

  public decrementProductCount() {
    this.decrement.emit(this.shoppingCartItem);
  }

  public removeFromCart() {
    this.remove.emit(this.shoppingCartItem);
  }
}
