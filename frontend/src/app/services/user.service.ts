import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser, RegisterUser } from '../models/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = 'http://0.0.0.0:8000';
  private token: string;
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private timeout: number = 2 * 24 * 60 * 60; // 2 days 
  private tokenTimer;

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken() {
    return this.token;
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }

  registerUser(user: RegisterUser) {
    this.http.post<{ token: string }>(`${this.url}/api/users/register/`, user)
      .subscribe(res => {
        this.token = res.token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.tokenTimer = setTimeout(i => {
          this.token = null;
          this.isAuthenticated = false;
          this.authStatusListener.next(false);
          window.alert("Your session has expired, please sign in again");
          this.logout();
          this.router.navigate(['/login']);
        }, this.timeout * 1000);
        this.router.navigate(['/']);
      });
  }

  loginUser(user: LoginUser) {
    this.http.post<{ token: string }>(`${this.url}/api/users/login/`, user)
      .subscribe(res => {
        this.token = res.token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.tokenTimer = setTimeout(i => {
          this.token = null;
          this.isAuthenticated = false;
          this.authStatusListener.next(false);
          window.alert("Your session has expired, please sign in again");
          this.logout();
          this.router.navigate(['/login']);
        }, this.timeout * 1000);
        const now: Date = new Date();
        const expiration: Date = new Date(now.getTime() + (this.timeout * 1000));
        this.saveTokenInLocalStorage(this.token, expiration);
        this.router.navigate(['/']);
      })
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearTokenInLocalStorage();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);
  }

  private saveTokenInLocalStorage(token, expirationDate: Date) {
    localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearTokenInLocalStorage() {
    localStorage.removeItem('token');
        localStorage.removeItem('expiration');
  }

  private getTokenFromLocalStorage() {
    const token: string = localStorage.getItem('token');
        const expiration: string = localStorage.getItem('expiration');
        if (!token || !expiration) {
            return;
        }
        return {
            token,
            expirationDate: new Date(expiration)
        };
  }

  autoAuthUser() {
    const authHeader = this.getTokenFromLocalStorage();
    if (!authHeader) {
        return;
    }
    const now = new Date();
    const isValid = authHeader.expirationDate > now;
    if (isValid) {
        this.token = authHeader.token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const duration: number = authHeader.expirationDate.getTime() - now.getTime();
        console.log('Setting duration in local storage as: ' + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration);
    }
}

}
