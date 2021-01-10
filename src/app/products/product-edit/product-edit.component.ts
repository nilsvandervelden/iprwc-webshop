import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Product } from '../product-model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productvinylFigureId = '';
  productName = '';
  productPrice = '';
  productDescription = '';
  productImagePath = '';

  isLoading = false;

  private productId: string;
  private editMode = false;

  index: number;
  product: Product;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productId")) {
        this.editMode = true
        this.productId = paramMap.get("productId");
        this.isLoading = true;
        this.productService.getProductById(this.productId).subscribe(productData => {
          this.isLoading = false;
          this.product = 
                        {
                          id: productData._id,
                          vinylFigureId: productData.vinylFigureId,
                          name: productData.name,
                          price: productData.price,
                          description: productData.description,
                          imagePath: productData.imagePath
                        };
        });
      } else {
        this.editMode = false;
        this.productId = null;
      }
    });
  }


  onCancel() {
    if(this.editMode) {
      this.router.navigate(['../../manage'], {relativeTo: this.route})
    } else {
      this.router.navigate(['../manage'], {relativeTo: this.route})
    }
  }
  
  onSaveProduct(form: NgForm) {
    if (this.editMode) {
      this.productService.updateProduct(
        this.productId,
        form.value.vinylFigureId,
        form.value.name,
        form.value.price,
        form.value.description,
        form.value.imagePath
      );
    } else {
      this.productService.addProduct(
        form.value.vinylFigureId,
        form.value.name,
        form.value.price,
        form.value.description,
        form.value.imagePath
      );
    }
    form.resetForm();
  }
}
