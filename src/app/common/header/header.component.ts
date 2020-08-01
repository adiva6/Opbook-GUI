import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public username: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getCachedUsername();
  }

}
