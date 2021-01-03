import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  productId: string;
  isLoading = false;

  constructor(private productService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productId")) {
        this.productId = paramMap.get("productId");
        this.productService.getProductById(this.productId).subscribe(productData => {
          this.isLoading = false;
          this.product = {
                          id: productData._id,
                          vinylFigureId: productData.vinylFigureId,
                          name: productData.name,
                          price: productData.price,
                          description: productData.description,
                          imagePath: productData.imagePath
                        };
        });
      } else {
        this.productId = null;
      }
    });
  }


  onAddToCart() {
    this.shoppingCartService.onAddItemToShoppingList({product: this.product, amount: 1})
  }

  onDeleteProduct(productId: string) {
    this.productService.deleteProduct(productId);
    this.router.navigate(['/products'])
  }
}


