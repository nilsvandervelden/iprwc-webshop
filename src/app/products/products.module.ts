import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ProductManagementItemComponent } from './product-management-panel/product-management-item/product-management-item.component';
import { ProductManagementPanelComponent } from './product-management-panel/product-management-panel.component';



@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductsComponent,
    ProductManagementItemComponent,
    ProductManagementPanelComponent,
    SpinnerComponent
  ],
  imports: [
    Ng2SearchPipeModule,
    RouterModule,
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
})
export class ProductsModule { }
