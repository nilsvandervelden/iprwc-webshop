import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Order } from "./order";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private orders: Order[] = [];
  orderChanged = new Subject<Order[]>();

  constructor(private httpClient: HttpClient) {}

  getOrderById(orderId: string) {
    return this.httpClient.get<any>(
      'http://localhost:3000/api/order/' + orderId)
  }

  getOrders() {
    return this.httpClient.get('http://localhost:3000/api/order')
    // this.httpClient
    //   .get<{message: string, orders: any}>(
    //     'http://localhost:3000/api/order' 
    //   )
    //   .pipe(map((orderData) => {
    //     return orderData.orders.map(order => {
    //       return {
    //         _id: order._id,
    //         createdAt: order.createdAt,
    //         delivered: order.deliverd,
    //         paid: order.deliverd,
    //         userId: order.userId,
    //         products: order.products
    //       }
    //     });
    //   }))
    //   .subscribe((transformedOrder) => {
    //     this.orders = transformedOrder;
    //     this.orderChanged.next([...this.orders]);
    //   });
  }

  getOrderUpdateListener() {
    return this.orderChanged.asObservable();
  }

  deleteOrder(orderId: string) {
    return this.httpClient.delete('http://localhost:3000/api/order/' + orderId)
  }
  
  togglePaid(orderId: string) {
    return this.httpClient.patch('http://localhost:3000/api/order/togglepaid/' + orderId, {})
  }

  toggleDelivered(orderId: string) {
    return this.httpClient.patch('http://localhost:3000/api/order/toggledelivery/' + orderId, {})
  }
}