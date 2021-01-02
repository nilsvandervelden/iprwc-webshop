import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductManagementPanelComponent } from './product-management-panel/product-management-panel.component';

const routes: Routes = [
  // {path: 'products', component: ProductsComponent, children: [
    {path: '', component: ProductListComponent},
    {path: 'manage', component: ProductManagementPanelComponent, canActivate: [AuthGuard]},
    {path: 'new', component: ProductEditComponent , canActivate: [AuthGuard]},
    {path: ':productId', component: ProductDetailComponent},
    {path: 'edit/:productId', component: ProductEditComponent , canActivate: [AuthGuard]},
  // ]},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class ProductsRoutingModule { }
