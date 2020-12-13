import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-order',
  templateUrl: './shopping-cart-order.component.html',
  styleUrls: ['./shopping-cart-order.component.scss']
})
export class ShoppingCartOrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onOrder() {
    console.log('order');
  }

}
