import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Order } from '../order';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss']
})
export class OrderListItemComponent implements OnInit {
  @Input() order: Order | undefined

  constructor() { }

  ngOnInit(): void {
  }

  toDisplayabledate(): string {
    if(this.order) {
      return moment(this.order.createdAt).calendar()
    }
    return ''
  }
}
