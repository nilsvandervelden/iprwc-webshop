import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartListItemComponent } from './shopping-cart-list-item/shopping-cart-list-item.component';
import { ShoppingCartListComponent } from './shopping-cart-list/shopping-cart-list.component';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartOrderComponent } from './shopping-cart-order/shopping-cart-order.component';



@NgModule({
  declarations: [
    ShoppingCartComponent,
    ShoppingCartListComponent,
    ShoppingCartListItemComponent,
    ShoppingCartOrderComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule
  ]
})
export class ShoppingCartModule { }
