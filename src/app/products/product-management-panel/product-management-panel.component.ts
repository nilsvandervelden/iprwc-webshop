import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private productService: ProductService) {}

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


