import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../products/product-model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  products: Product[];
  private productChangeSubscription: Subscription;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.products = this.shoppingListService.getProducts();
    this.productChangeSubscription = this.shoppingListService.productChanged
      .subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  ngOnDestroy() {
    this.productChangeSubscription.unsubscribe();
  }

  onDeleteItem(index: number) {
    console.log('test');
  }
}
