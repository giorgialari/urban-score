import { Component, OnInit } from '@angular/core';

import { User } from '../users';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selectedUserCount: number = 10;



  constructor(public userService: UserService) {

    this.nUserForm = new FormGroup({
      userNumber: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.APIkey = localStorage.getItem('token') as string;
    this.userService.nUsers = this.selectedUserCount;
    this.userService.getUsers().subscribe(users => this.users = users);

  }


  nextPage() {
    this.userService.nPage = this.userService.nPage + 1
    this.getUsers()
  }
  previousPage() {
    this.userService.nPage = this.userService.nPage - 1
    this.getUsers()
  }





  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.id).subscribe();
  }
}
