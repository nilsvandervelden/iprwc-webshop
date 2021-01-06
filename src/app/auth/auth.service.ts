import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { Customer } from "../customer/customer";
import { AuthData } from "./auth-data.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  me() {
    console.log('test')
    return this.httpClient.get('http://localhost:3000/api/user/me')
  }


  createUser(customer: Customer) {
    const customerToSend: any = customer;
    this.httpClient.post("http://localhost:3000/api/user/signup", customerToSend)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.httpClient.post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/login", authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationData = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationData)
        this.router.navigate(['/']);
      }
    });
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  upgradeToAdmin(key: string) {
    return this.httpClient.post<any>(
      'http://localhost:3000/api/user/upgrade-to-admin', {key})
  }

  getOrderById(orderId: string) {
    return this.httpClient.get<any>(
      'http://localhost:3000/api/order/' + orderId)
  }
}