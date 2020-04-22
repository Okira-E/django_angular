import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginUser, RegisterUser} from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "http://localhost:8000";

  constructor(private http: HttpClient) {
  }

  registerUser(user: RegisterUser) {
    console.log(user);
  }

  loginUser(user: LoginUser) {
    console.log(user);
  }
}
