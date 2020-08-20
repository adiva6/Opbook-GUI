import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user/user';
import {AuthService} from '../../services/auth/auth.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.initUser();
  }

  private initUser(): void {
    this.authService.getUser().pipe(
      tap(user => {
        this.user = user;
      })
    ).subscribe();
  }

}
