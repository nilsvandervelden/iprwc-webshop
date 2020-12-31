import { Component } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm): void {
    if(form.invalid) {
      return;
    } else {
      // this.authService.login(form.value.email, form.value.password);
      console.log('login');
    }
  }
}

