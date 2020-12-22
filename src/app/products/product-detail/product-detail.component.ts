import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { Product } from '../product-model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;

  constructor(private productService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.product = this.productService.getProduct(this.id);
      }
    );
  }


  onAddToCart() {
    this.shoppingCartService.onAddItemToShoppingList(this.product)
  }

  onDeleteProduct(productId: string) {
    console.log(productId);
    this.productService.deleteProduct(productId);
    this.router.navigate(['/products'])
  }

  onEditProduct(productId: string) {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}


