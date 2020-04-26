import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public authStatusSub: Subscription;
  public isAuthenticated: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.userService.getIsAuth();
    this.authStatusSub = this.userService.getAuthStatus().subscribe(res /*boolean*/=> {
      this.isAuthenticated = res;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
  }
}
