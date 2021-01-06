import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CountryPickerComponent } from "../country-picker/country-picker.component";
import { OrderRoutingModule } from "../order/order-routing.module";
import { CustomerLoginComponent } from "./customer-login/customer-login.component";
import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomerSignupComponent } from "./customer-signup/customer-signup.component";
import { CustomerComponent } from "./customer.component";
import { UpgradeToAdminComponent } from './upgrade-to-admin/upgrade-to-admin.component';

@NgModule({
  declarations: [
    CustomerLoginComponent,
    CustomerSignupComponent,
    CountryPickerComponent,
    CustomerComponent,
    UpgradeToAdminComponent,
  ],
  imports: [
    CustomerRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    OrderRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
  ],
})
export class CustomerModule { }
