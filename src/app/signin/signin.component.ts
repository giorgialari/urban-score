import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    // Initialize the form
    this.form = new FormGroup({
      accesstoken: new FormControl('', Validators.required)
    });
  }



  onSubmit() {
    // console.log('Access-token entered by the user:', this.form.value.accesstoken);
    // Store API-Key entered by user to Auth-Service:
    this.authService.APIkey = this.form.value.accesstoken;
    // // Reset form-inputs:
    // this.form.reset();
    // Send API-Key entered by user to backend:
    this.authService.signIn(this.authService.APIkey).subscribe(
      (data) => {
        // console.log('Data Returned from backend:', data);
        if (data.status == 200) {
          const tokenValue = this.form.value.accesstoken
          this.authService.isLoggedIn = true;
          this.router.navigate(['/user'],
            { queryParams: { token: tokenValue } });
        }
      })
  }
}

