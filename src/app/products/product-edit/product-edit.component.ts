import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
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
        this.product = this.productService.getProductByIndex(this.index);
      } else {
        this.editMode = false;
        this.productId = null;
      }
    });
  }

  // ngOnInit() {
  //   this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //     if (paramMap.has("productId")) {
  //       this.editMode = true
  //       this.productId = paramMap.get("productId");
  //       this.productService.getProductById(this.productId).subscribe(productData => {
  //         this.product = {
  //                         id: productData._id,
  //                         vinylFigureId: productData.vinylFigureId,
  //                         name: productData.name,
  //                         price: productData.price,
  //                         description: productData.description,
  //                         imagePath: productData.imagePath
  //                       };
  //       });
  //     } else {
  //       this.editMode = false;
  //       this.productId = null;
  //     }
  //   });
  // }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
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
