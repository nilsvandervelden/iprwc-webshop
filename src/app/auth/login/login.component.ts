import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string;
  showError: boolean;

  constructor() {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userData: new FormGroup({
        email: new FormControl(null, [ Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
      })
    });
  }

  onSubmit(): void {
    console.log('hallo');
  }

  changeLabelColor(formControlName: string): string {
    const errorColor = 'color: #E74C3C;';
    const defaultColor = 'color: #000000;';
    return !this.loginForm.get(formControlName).valid && this.loginForm.get(formControlName).touched ? errorColor : defaultColor;
  }
}

