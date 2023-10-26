import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';



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
    this.authService.signIn().subscribe(
      (data) => {
        if (data.status == 200) {
          const tokenValue = this.form.value.accesstoken
          this.authService.isLoggedIn = true;
          localStorage.setItem('token', tokenValue);
          this.router.navigate(['/user']);
        }
      })
  }
}

