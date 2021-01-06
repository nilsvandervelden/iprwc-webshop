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

  productsInCard: ShoppingCartItem[];

  userIsAuthenticated = false;
  userIsAdmin = false;
  private authListenerSubs: Subscription;
  private adminListenerSubs: Subscription;

  constructor(private shoppingCartService: ShoppingCartService,
              private authService: AuthService) { }


  ngOnInit(): void {
    this.productsInCard = this.shoppingCartService.getShoppingCartItems();
    this.shoppingCartService.cartSubject.subscribe((newShoppingCartItems) => {
      this.productsInCard = newShoppingCartItems;
    })


    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log(this.authService.checkIfAdmin());
    // this.userIsAdmin = this.authService.checkIfAdmin();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
    (isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    }))
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}

