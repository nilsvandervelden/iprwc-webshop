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
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
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
      this.productService.updateProduct(this.id, this.productForm.value);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.onCancel();
  }

  get controls() { 
    return (<FormArray>this.productForm.get('products')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.productForm.get('products')).push(
      new FormGroup({
        'vinylFigureId': new FormControl(null, Validators.required),
        'name': new FormControl(null, Validators.required),
        'price': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        'description': new FormControl(null, Validators.required),
        'imagePath': new FormControl(null, Validators.required),
      })
    );
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
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      'description': new FormControl(productDescription, Validators.required),
      'imagePath': new FormControl(productImagePath, Validators.required),
    });
  }
}
