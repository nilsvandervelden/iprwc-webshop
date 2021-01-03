import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent {

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm): void {
    if(form.invalid) {
      return;
    } else {
      this.authService.login(form.value.email, form.value.password);
    }
  }
}

