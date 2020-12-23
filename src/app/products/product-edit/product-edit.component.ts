import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  private productId: string;
  id: number;
  editMode = false;
  productForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        this.productId = this.productService.getProduct(this.id).id;
        console.log('id: ' + this.id)
        console.log('product id' + this.productId)
      }
    );
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
      const product = this.productService.getProduct(this.id);
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
