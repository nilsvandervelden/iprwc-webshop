import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CustomerLoginComponent } from './customer/customer-login/customer-login.component';
import { CustomerSignupComponent } from './customer/customer-signup/customer-signup.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'login', component: CustomerLoginComponent},
  {path: 'signup', component: CustomerSignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutingModule {

}