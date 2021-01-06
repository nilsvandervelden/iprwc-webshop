import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-upgrade-to-admin',
  templateUrl: './upgrade-to-admin.component.html',
  styleUrls: ['./upgrade-to-admin.component.scss']
})
export class UpgradeToAdminComponent implements OnInit {

  upgradeForm: FormGroup | any
  error: string = ''

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.upgradeForm = new FormGroup({
      data: new  FormGroup({
        upgradeToken: new FormControl(null, [Validators.required]),
      })
    })
  }

  submit() {
    if(this.upgradeForm.status === "INVALID") {
      this.error = 'You didn\'t correctly fill the form, please try again...'
      return 
    }
    this.authService.upgradeToAdmin(this.upgradeForm.value['data']['upgradeToken']).subscribe(result => {
      console.log(result)
      this.error = ''
      this.router.navigate(['/account/dashboard'])
    }, err => {
      this.error = 'Wrong upgrade key'
    })
  }

  changeLabelColor(formControlName: string): string {
    const errorColor = 'color: #E74C3C;';
    const defaultColor = 'color: #000000;';
    return !this.upgradeForm.get(formControlName).valid && this.upgradeForm.get(formControlName).touched ? errorColor : defaultColor;
  }
}


