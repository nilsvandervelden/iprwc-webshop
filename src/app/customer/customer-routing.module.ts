import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';

const appRoutes: Routes = [
  {path: 'login', component: CustomerLoginComponent},
  {path: 'signup', component: CustomerSignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class CustomerRoutingModule {

}