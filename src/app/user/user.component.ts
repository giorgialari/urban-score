import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { of } from 'rxjs';

import { User } from '../users';
import { UserService } from '../user.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  token!: string;
  nUserForm: FormGroup;
  searchText: any;


  constructor(public userService: UserService) {

  this.nUserForm = new FormGroup ({
    userNumber: new FormControl ('', Validators.required)
  })
  }
  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
      this.userService.APIkey = localStorage.getItem('token') as string;
      this.userService.nUsers = this.nUserForm.value.userNumber;
    this.userService.getUsers().subscribe(users => this.users = users);

  }


nextPage(){
  this.userService.nPage = this.userService.nPage+1
  this. getUsers()
}
previousPage(){
  this.userService.nPage = this.userService.nPage-1
  this. getUsers()
}





  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.id).subscribe();
  }
}
