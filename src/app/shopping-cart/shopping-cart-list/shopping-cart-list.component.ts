import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product-model';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {

  @Input() public products: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
