import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product-model';
import { ShoppingCartItem } from '../shopping-cart-product.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.scss']
})
export class ShoppingCartListComponent implements OnInit {

  @Input() public products: ShoppingCartItem[] = [];
  @Output() public remove: EventEmitter<number> = new EventEmitter<number>();
  @Output() public increment: EventEmitter<number> = new EventEmitter<number>();
  @Output() public decrement: EventEmitter<number> = new EventEmitter<number>();
  private subscription: Subscription;
  public amountOfProductsInCart = 0;
  

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

  public onRemoveitemFromList(index: number) {
    this.remove.emit(index);
  }

  public onIncrementProductCount(index: number) {
    this.increment.emit(index);
  }

  public decrementProductCount(index: number) {
    this.decrement.emit(index);
  }
}
