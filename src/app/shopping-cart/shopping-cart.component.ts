import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../products/product-model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  public products: Product[] = [];

  private subscription: Subscription;
  
  constructor(private shoppingcardService: ShoppingCartService) { }

  ngOnInit(): void {
    this.products = this.shoppingcardService.getAll();
    
    this.subscription = this.shoppingcardService.productsInCartChanged
    .subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  onDeleteItem(index: number) {
    console.log('test');
  }
}
