import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../product-model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { 
              }

  ngOnInit(): void {
    this.productService.getProducts();
    this.subscription = this.productService.productChanged
    .subscribe(
      (products: Product[]) => {
        this.products = products;
      });
  }

  onNewProduct() {
    // this.router.navigate(['new'], {relativeTo: this.route});
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
