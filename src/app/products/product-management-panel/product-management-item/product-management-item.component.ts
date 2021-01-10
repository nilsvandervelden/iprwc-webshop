import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../../product-model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-management-item',
  templateUrl: './product-management-item.component.html',
  styleUrls: ['./product-management-item.component.scss']
})
export class ProductManagementItemComponent implements OnInit, OnDestroy {

  @Input() product: Product;
  @Input() productId: string;
  isLoading = false;

  userIsAuthenticated = false;;
  private authListenerSubs: Subscription;

  constructor(private productService: ProductService,
              private authService: AuthService,
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
                this.userIsAuthenticated = this.authService.getIsAuth();
                this.authListenerSubs = this.authService.getAuthStatusListener()
                .subscribe(isAuthenticated => {
                  this.userIsAuthenticated = isAuthenticated;
                });
              }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }  

  onDeleteProduct(productId: string) {
    this.productService.deleteProduct(productId);
    this.router.navigate(['/products/manage'])
  }
}





