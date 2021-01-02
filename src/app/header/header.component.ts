import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ShoppingCartItem } from '../shopping-cart/shopping-cart-product.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public amountOfProductsInCart: number = 0;
  private subscription: Subscription;

  userIsAuthenticated = false;;
  private authListenerSubs: Subscription;

  constructor(private shoppingCartService: ShoppingCartService,
              private authService: AuthService) { }


  ngOnInit(): void {
    this.subscription = this.shoppingCartService.productsInCartChanged
    .subscribe((productsInCart: ShoppingCartItem[]) => {
      this.amountOfProductsInCart = 0;
      for(let i of productsInCart) {
        this.amountOfProductsInCart += i.quantity;
      }
    });
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }
}

