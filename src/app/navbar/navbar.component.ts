import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private searchService: SearchService) { }
  showNavbar = false;
  public searchText: string = '';

  ngOnInit() {
    this.updateNavbarVisibility();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavbarVisibility();
      }
    });
  }

  private updateNavbarVisibility() {
    const token = localStorage.getItem('token');
    if (token || this.router.url !== '/') {
      this.showNavbar = true;
    } else {
      this.showNavbar = false;
    }
  }

  onSearchTextChanged(): void {
    this.searchService.setSearchText(this.searchText);
  }

  logout() {
    this.showNavbar = false;
    this.authService.logout();
  }

}
