import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../../services/signup/signup.service';
import { User } from '../../../models/user/user';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import {catchError, tap} from 'rxjs/operators';
import {AlertService} from '../../../services/alert/alert.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private signupService: SignupService,
              private authService: AuthService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.initSignupForm();
  }

  private initSignupForm(): void {
    this.signupForm = this.formBuilder.group({});
    this.signupForm.addControl('name', new FormControl(undefined, Validators.required));
    this.signupForm.addControl('email', new FormControl(undefined, [Validators.required, Validators.email]));
    this.signupForm.addControl('password', new FormControl(undefined, Validators.required));
  }

  private checkPasswords = () => {
    const pass = this.signupForm.get('password')?.value;
    const confirmPass = this.signupForm.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true };
  };

  public signup(): void {
    const user = new User(this.signupForm.get('name').value,
      this.signupForm.get('email').value, false, this.signupForm.get('password').value);
    this.signupService.signup(user).pipe(
      tap(() => {
        this.authService.login(user.email, user.password).subscribe(() => {
            this.router.navigateByUrl('/home');
          });
      }),
      catchError(err => {
        if (err.error.email) {
          this.alertService.error(err.error.email);
        } else {
          this.alertService.error(err.error);
        }
        return of(undefined);
      })
    ).subscribe();
  }
}
