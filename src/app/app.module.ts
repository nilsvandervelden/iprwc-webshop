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
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './orders/order.module';
import { OrderService } from './orders/order.service';
import { AuthService } from './auth/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    CustomerModule,
    NgbModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, ProductService, ShoppingCartService, OrderService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
