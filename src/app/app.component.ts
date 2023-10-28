import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'urban-score';
  constructor(private router: Router) { }

  ngOnInit() {
    const apiKey = localStorage.getItem('apiKey');
    if (apiKey && apiKey.trim() !== '') {
      this.router.navigate(['/user']);
    }
  }

}
