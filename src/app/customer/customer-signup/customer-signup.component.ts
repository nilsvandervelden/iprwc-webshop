import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";

@Component({
  templateUrl: './customer-signup.component.html',
  styleUrls: ['./customer-signup.component.scss']
})
export class CustomerSignupComponent {
  errorMessage = ''
  selectedCountry: string | undefined

  @Output() registered: EventEmitter<void> = new EventEmitter();

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm): void {
    const customer = form.value;
    
    customer.country = this.selectedCountry

    if(customer.invalid) {
    return;
    } else {
      this.authService.createUser(customer);
    }
  }

  onCountrySelected(country: any) {
    this.selectedCountry = country.name
  }
}

