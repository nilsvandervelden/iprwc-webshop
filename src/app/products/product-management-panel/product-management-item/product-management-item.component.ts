import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from '../../product-model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-management-item',
  templateUrl: './product-management-item.component.html',
  styleUrls: ['./product-management-item.component.scss']
})
export class ProductManagementItemComponent implements OnInit {

  @Input() product: Product;
  @Input() productId: string;
  isLoading = false;

  constructor(private productService: ProductService,
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

  onDeleteProduct(productId: string) {
    console.log(productId);
    this.productService.deleteProduct(productId);
    this.router.navigate(['/products'])
  }
}





