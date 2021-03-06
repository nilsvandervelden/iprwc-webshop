import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Order } from "./order";
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + "/order/";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private orders: Order[] = [];
  orderChanged = new Subject<Order[]>();

  constructor(private httpClient: HttpClient) {}

  getOrderById(orderId: string) {
    return this.httpClient.get<any>(
      BACKEND_URL + orderId)
  }

  getOrders() {
    return this.httpClient.get(BACKEND_URL)
  }

  getOrderUpdateListener() {
    return this.orderChanged.asObservable();
  }

  deleteOrder(orderId: string) {
    return this.httpClient.delete(BACKEND_URL + orderId)
  }
  
  togglePaid(orderId: string) {
    return this.httpClient.patch(BACKEND_URL + 'togglepaid/' + orderId, {})
  }

  toggleDelivered(orderId: string) {
    return this.httpClient.patch(BACKEND_URL + 'toggledelivery/' + orderId, {})
  }
}