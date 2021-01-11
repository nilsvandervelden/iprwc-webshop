import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { timeoutWith } from 'rxjs/operators';
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

  public isCollapsed = true;

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
    this.userIsAdmin  = this.authService.getIsAdmin();
    this.adminListenerSubs = this.authService.getAdminStatusListener().subscribe(
    (isAdmin => {
      this.userIsAdmin = isAdmin

    }))

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
    (isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    }))
  }

  collapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();
  }
}

