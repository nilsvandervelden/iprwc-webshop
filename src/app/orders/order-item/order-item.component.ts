import { EventEmitter, Component, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartItem } from 'src/app/shopping-cart/shopping-cart-product.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() orderItem: ShoppingCartItem
  @Output() updated: EventEmitter<ShoppingCartItem> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}
