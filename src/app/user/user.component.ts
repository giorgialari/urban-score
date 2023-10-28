import { Component, OnInit } from '@angular/core';

import { User } from '../models/users';
import { UserService } from '../services/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../services/search/search.service';
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

  constructor(public userService: UserService, private searchService: SearchService) {

    this.nUserForm = new FormGroup({
      userNumber: new FormControl('', Validators.required)
    })
    this.searchService.searchText$.subscribe(text => {
      this.searchText = text;
    });
  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.APIkey = sessionStorage.getItem('token') as string;
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
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.getUsers();
      });
    }

  }
}
