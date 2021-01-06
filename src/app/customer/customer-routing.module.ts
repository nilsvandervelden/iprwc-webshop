import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { UpgradeToAdminComponent } from './upgrade-to-admin/upgrade-to-admin.component';

const routes: Routes = [
  {path: 'login', component: CustomerLoginComponent},
  {path: 'signup', component: CustomerSignupComponent},
  {path: 'upgrade', component: UpgradeToAdminComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})

export class CustomerRoutingModule {

}