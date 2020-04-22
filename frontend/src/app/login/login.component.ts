import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginUser} from '../models/user.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    const user: LoginUser = {
      email: form.value.email,
      password: form.value.password
    };
    if (form.invalid) {
      return; // todo return error to the user
    }

    this.userService.loginUser(user);
  }

}
