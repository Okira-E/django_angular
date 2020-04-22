import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginUser, RegisterUser} from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "http://0.0.0.0:8000";

  constructor(private http: HttpClient) {
  }

  registerUser(user: RegisterUser) {
    this.http.post<{message: string}>(`${this.url}/api/users/register/`, user)
      .subscribe(res => {
        console.log(res);
      })
  }

  loginUser(user: LoginUser) {
    console.log(user);
  }
}
