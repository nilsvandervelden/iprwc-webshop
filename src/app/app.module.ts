import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './products/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ProductsModule } from './products/products.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ShoppingCartModule,
    OrderModule,
    ProductsModule,
    CustomerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, ProductService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
