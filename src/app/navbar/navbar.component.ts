import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() api:any;

  constructor(
    private router:Router){}
 

    urlPath = window.location.pathname;
    currentPath = this.urlPath

    ngOnInit() {
      (document.getElementById('api') as HTMLInputElement).value =this.api;
      if(this.currentPath == '/'){
        (document.getElementById('routerLogin') as HTMLInputElement).style.display ='none'
      } else{
        (document.getElementById('routerLogin') as HTMLInputElement).style.display ='block'
      }
    }

  empty(){
    (document.getElementById('api') as HTMLInputElement).value =''
    window.location.href='/'
  }



}
