import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loginResult: string;
  private returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['next'] || '/';

    if (this.authService.hasAuthorization()) {
      this.router.navigateByUrl(this.returnUrl);
    }

    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({});
    this.loginForm.addControl('email', new FormControl(undefined, Validators.required));
    this.loginForm.addControl('password', new FormControl(undefined, Validators.required));
  }

  public login(): void {
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).pipe(
      map(() => this.router.navigateByUrl(this.returnUrl)),
      catchError(_ => {
        this.alertService.error('Authentication failed');
        return of(undefined);
      })
    ).subscribe();
  }
}
