import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/products/product-model';
import { ShoppingCartItem } from '../shopping-cart-product.model';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {

  @Input() public products: ShoppingCartItem[] = [];
  @Output() public remove: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public onRemoveitemFromList(index: number) {
    this.remove.emit(index);
  }
}
