import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private authService:AuthService,
    private router:Router
  ){}
  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['signin']);
  }

}
