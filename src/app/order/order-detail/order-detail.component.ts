import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'src/app/shopping-cart/shopping-cart-product.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() orderItem: ShoppingCartItem

  constructor() { }

  ngOnInit(): void {
  }

}
