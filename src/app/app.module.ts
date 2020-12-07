import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './products/product.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductItemComponent,
    ShoppingListComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ProductService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
