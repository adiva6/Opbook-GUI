import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user/user';
import {AuthService} from '../../services/auth/auth.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SidenavService} from '../../services/sidenav/sidenav.service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  public user: User;

  constructor(private authService: AuthService,
              private sidenavService: SidenavService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.initUser();
  }

  ngAfterViewInit(): void {
    this.sidenavService.isSidenavOpen.subscribe(isOpen => {
      if (this.sidenav) {
        this.sidenav.toggle(isOpen);
      }
    });
  }

  private initUser(): void {
    this.authService.getUser().pipe(
      tap(user => {
        this.user = user;
      })
    ).subscribe();
  }

}
