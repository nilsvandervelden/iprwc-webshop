import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../products/product-model';
import { ShoppingCartItem } from './shopping-cart-product.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public products: ShoppingCartItem[] = [];

  private subscription: Subscription;
  
  constructor(private shoppingcardService: ShoppingCartService) { }

  ngOnInit(): void {
    this.products = this.shoppingcardService.getAll();
    
    this.subscription = this.shoppingcardService.productsInCartChanged
    .subscribe((products: ShoppingCartItem[]) => {
      this.products = products;
    });
  }

  public removeProductFromCart(index: number) {
    this.shoppingcardService.delete(index);
  }
}

