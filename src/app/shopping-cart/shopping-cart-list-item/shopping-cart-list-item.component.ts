import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartItem } from '../shopping-cart-product.model';

@Component({
  selector: 'app-shopping-cart-list-item',
  templateUrl: './shopping-cart-list-item.component.html',
  styleUrls: ['./shopping-cart-list-item.component.scss']
})
export class ShoppingCartListItemComponent implements OnInit {

  @Input() shoppingCartItem: ShoppingCartItem | any;
  @Output() updated: EventEmitter<ShoppingCartItem> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  updateAmount(newAmount: number) {
    this.shoppingCartItem.amount = newAmount
    this.updated.emit(this.shoppingCartItem)
  }
}

