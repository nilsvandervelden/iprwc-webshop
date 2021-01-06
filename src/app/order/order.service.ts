import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Order } from "./order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  orderChanged = new Subject<Order[]>();

  constructor(private httpClient: HttpClient) {}

  fetchOrder(orderId: string) {
    return this.httpClient.get('order/fetch/' + orderId)
  }

  getOrders() {
    this.httpClient
      .get<{message: string, orders: any}>(
        'http://localhost:3000/api/order' 
      )
      .pipe(map((orderData) => {
        console.log(orderData)
        return orderData.orders.map(order => {
          return {
            id: order._id,
            createdAt: order.createdAt,
            deliverd: order.delivered,
            paid: order.paid,
            userId: order.userId,
            products: order.products
          }
        });
      }))
      .subscribe((transformedOrder) => {
        this.orders = transformedOrder;
        this.orderChanged.next([...this.orders])
      });
  }

  deleteOrder(order: string) {
    return this.httpClient.delete('order/delete/' + order)
  }
  
  togglePaid(order: string) {
    return this.httpClient.patch('order/togglepaid/' + order, {})
  }

  toggleDelivered(order: string) {
    return this.httpClient.patch('order/toggledelivery/' + order, {})
  }
}