import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  form: FormGroup;
  @Output() addUserEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(public userService: UserService) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      status: new FormControl('active', Validators.required),
    });
  }

  add() {
    this.userService.APIkey = localStorage.getItem('token') as string;
    this.userService.addUser(this.form.value).subscribe(
      (response) => {
        this.addUserEventEmitter.emit(response);
      },
      (error) => {
        alert(error.error.error.message);
      }
    );
  }
}
