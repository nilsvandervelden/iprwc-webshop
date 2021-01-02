import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product-model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-management-panel',
  templateUrl: './product-management-panel.component.html',
  styleUrls: ['./product-management-panel.component.scss']
})
export class ProductManagementPanelComponent implements OnInit {
  products: Product[];
  subscription: Subscription;
  term: string;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private productService: ProductService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.productService.getProducts();
    this.subscription = this.productService.productChanged
    .subscribe(
      (products: Product[]) => {
        this.products = products;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
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


