import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {RegisterUser} from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public passwordError: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  registerUser(form: NgForm) {
    const user: RegisterUser = {
      first_name: form.value.fname,
      last_name: form.value.lname,
      email: form.value.email,
      password: form.value.password,
    };
    if (form.invalid) {
      return; // todo send a message to the user
    } else if (form.value.password !== form.value.password2) {
      this.passwordError = "Both passwords must match!";
      return;
    }

    this.passwordError = "";
    this.userService.registerUser(user);
  }

}
