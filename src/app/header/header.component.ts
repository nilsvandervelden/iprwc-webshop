import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../products/product-model';
import { ShoppingCartItem } from '../shopping-cart/shopping-cart-product.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public amountOfProductsInCart: number = 0;
  private productInCart: ShoppingCartItem[];
  private subscription: Subscription;


  constructor(private shoppingCartService: ShoppingCartService) { }


  ngOnInit(): void {
    this.subscription = this.shoppingCartService.productsInCartChanged
    .subscribe((productsInCart: ShoppingCartItem[]) => {
      this.amountOfProductsInCart = 0;
      for(let i of productsInCart) {
        this.amountOfProductsInCart += i.quantity;
      }
    });
  }
}

