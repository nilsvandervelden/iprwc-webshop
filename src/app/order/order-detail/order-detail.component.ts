import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product-model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() item: Product

  constructor() { }

  ngOnInit(): void {
  }

}
