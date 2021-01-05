import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product-model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail-item.component.html',
  styleUrls: ['./order-detail-item.component.scss']
})
export class OrderDetailItemComponent implements OnInit {
  @Input() item: Product

  constructor() { }

  ngOnInit(): void {
  }

}
