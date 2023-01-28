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
  form: FormGroup;
  nUserForm: FormGroup;
  searchText: any;


  constructor(public userService: UserService) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
  });
  this.nUserForm = new FormGroup ({
    userNumber: new FormControl ('', Validators.required)
  })
  }
  ngOnInit(): void {
    this.getUsers();
  }


  urlParams = new URLSearchParams(window.location.search)
  urlVal = this.urlParams.get('token')
  tokenUrl = this.urlVal as any
  

  getUsers() {
      this.userService.APIkey = this.urlVal as string 
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
  
  
add(name: string, gender: string, email: string, status: string): void {
  name = name.trim();
  gender = gender.trim();
  email = email.trim();
  status = status.trim();
  this.userService.APIkey = this.urlVal as string
    this.userService.addUser(email, name, gender, status).subscribe(data => {
      this.users.push(data);
      this.getUsers();
      },
    error =>{
      if (error.status) {
        alert('Error: ' + JSON.stringify(error.error));
      }
 });
}

  
  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.id).subscribe();
  }
}
