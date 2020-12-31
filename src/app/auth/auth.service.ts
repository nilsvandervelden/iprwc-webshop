import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private httpCleint: HttpClient) {}

  createUser(email: string, password: string) {

  }
}