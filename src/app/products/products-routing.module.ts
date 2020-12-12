import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent, children: [
    {path: '', component: ProductListComponent},
    {path: 'new', component: ProductEditComponent},
    {path: ':id', component: ProductDetailComponent},
    {path: ':id/edit', component: ProductEditComponent},
  ]},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductsRoutingModule { }
