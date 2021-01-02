import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartItem } from '../shopping-cart-product.model';

@Component({
  selector: 'app-shopping-cart-list-item',
  templateUrl: './shopping-cart-list-item.component.html',
  styleUrls: ['./shopping-cart-list-item.component.scss']
})
export class ShoppingCartListItemComponent implements OnInit {

  @Input() public shoppingCartItem: ShoppingCartItem;
  @Input() public index: number;
  @Output() public remove: EventEmitter<number> = new EventEmitter<number>();
  @Output() public increment: EventEmitter<number> = new EventEmitter<number>();
  @Output() public decrement: EventEmitter<number> = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  public incrementProductCount() {
    this.increment.emit(this.index);
  }

  public decrementProductCount() {
    this.decrement.emit(this.index);
  }

  public removeFromCart() {
    this.remove.emit(this.index);
  }
}
