import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { Product } from '../../product-model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;

  constructor(private shoppingCartService: ShoppingCartService){}

  ngOnInit(): void {

  }

  onAddToCart() {
    console.log(this.product.name);
    this.shoppingCartService.onAddItemToShoppingList(this.product)
  }
}