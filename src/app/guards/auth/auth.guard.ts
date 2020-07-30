import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, of } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  public static AUTH_CHECK_FREQUENCY = 120;  // Authentication expiration time in seconds
  private lastChecked: Date;

  constructor(private authService: AuthService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const currentDate = new Date();
    // If we've already checked the user in the last few minutes, don't check him again!
    if (this.lastChecked &&
      (currentDate.getTime() - this.lastChecked.getTime()) / 1000 < AuthGuard.AUTH_CHECK_FREQUENCY) {
      return of(true);
    }

    return this.authService.verifyAuthentication()
      .pipe(
        map(user => {
          if (user == null) {
            this.failAuthentication(state);
            return false;
          }

          this.lastChecked = new Date();
          return true;
        }),
        catchError(() => {
          this.failAuthentication(state);
          return of(false);
        })
      );
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

  public resetAuthentication() {
    // there are cases when we want to reset last checked because if lastChecked is smaller
    // than CHECK_FREQUENCY canActivate will return true without verifying authentication
    this.lastChecked = null;
  }

  private failAuthentication(state: RouterStateSnapshot) {
    console.warn('Authentication failed. Logging out');
    this.authService.logout({ queryParams: { next: state.url } });
  }
}
