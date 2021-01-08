import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ShoppingCartUtil } from '../shared/shopping-cart-util';
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

    this.authService.checkIfAdmin().subscribe(res => {
      this.userIsAdmin = res.admin;
    });
    this.adminListenerSubs = this.authService.getAdminStatusListener().subscribe((
      isAdmin => {
        this.userIsAdmin = isAdmin;
      }
    ))

    this.userIsAuthenticated = this.authService.getIsAuth();
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

