import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Product } from '../product-model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  private productId: string;
  index: number;
  editMode = false;
  product: Product;
  productForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  // ngOnInit(): void {
  //   this.route.params
  //   .subscribe(
  //     (params: Params) => {
  //       this.index = params['id'];
  //       this.editMode = params['id'] != null;
  //       this.initForm();
  //       this.productId = this.productService.getProductByIndex(this.index).id;
  //       console.log('id: ' + this.index)
  //       console.log('product id' + this.productId)
  //     }
  //   );
  // }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productId")) {
        this.editMode = true
        this.productId = paramMap.get("productId");
        this.productService.getProductById(this.productId).subscribe(productData => {
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
        this.editMode = false;
        this.productId = null;
      }
    });
  }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteProduct(index: number) {
    (<FormArray>this.productForm.get('products')).removeAt(index);
  }
  
  onSubmit() {
    if (this.editMode) {
      this.productService.updateProduct(
        this.productId,
        this.productForm.controls['vinylFigureId'].value,
        this.productForm.controls['name'].value,
        this.productForm.controls['price'].value,
        this.productForm.controls['description'].value,
        this.productForm.controls['imagePath'].value,
      );
      // this.productService.updateProduct(this.productForm.get('title'))
    } else {
      const formValue = this.productForm.controls;
      this.productService.addProduct(
        this.productForm.controls['vinylFigureId'].value,
        this.productForm.controls['name'].value,
        this.productForm.controls['price'].value,
        this.productForm.controls['description'].value,
        this.productForm.controls['imagePath'].value,
        );
    }
    this.onCancel();
  }

  get controls() { 
    return (<FormArray>this.productForm.get('name')).controls;
  }

  private initForm() {
    let productvinylFigureId = '';
    let productName = '';
    let productPrice = '';
    let productDescription = '';
    let productImagePath = '';

    if(this.editMode) {
      const product = this.productService.getProductByIndex(this.index);
      productvinylFigureId = String(product.vinylFigureId);
      productName = product.name;
      productPrice = String(product.price);
      productDescription = product.description;
      productImagePath = product.imagePath;
    }

    this.productForm = new FormGroup({
      'vinylFigureId': new FormControl(productvinylFigureId, Validators.required),
      'name': new FormControl(productName, Validators.required),
      'price': new FormControl(productPrice, [
        Validators.required,
      ]),
      'description': new FormControl(productDescription, Validators.required),
      'imagePath': new FormControl(productImagePath, Validators.required),
    });
  }
}
