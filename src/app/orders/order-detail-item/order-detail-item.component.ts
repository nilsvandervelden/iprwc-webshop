import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/products/product-model';
import { OrderItem } from '../orderItem';

@Component({
  selector: 'app-order-detail-item',
  templateUrl: './order-detail-item.component.html',
  styleUrls: ['./order-detail-item.component.scss']
})
export class OrderDetailItemComponent implements OnInit {
  @Input() item: OrderItem


  constructor() { }

  ngOnInit(): void {
  }

}
