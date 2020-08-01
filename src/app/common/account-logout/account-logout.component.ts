import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-account-logout',
  templateUrl: './account-logout.component.html',
  styleUrls: ['./account-logout.component.css']
})
export class AccountLogoutComponent {

  constructor(private authService: AuthService) { }

  public logout(): void {
    this.authService.logout();
  }
}
