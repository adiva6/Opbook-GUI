import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { finalize, map, share } from 'rxjs/operators';
import { User } from '../../models/user/user';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable()
export class AuthService {
  private static AUTH_KEY = 'auth';
  private static USERNAME_KEY = 'username';
  private static LOGIN_URL = 'login';
  private isLoggedIn: boolean;
  private username: string;
  private user: User;
  private userObservable$: Observable<User>;

  @Output() public userLogout = new EventEmitter<any>();

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public login(email: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post(environment.SERVER_ADDRESS + '/authenticate',
      { email, password }, { headers })
      .pipe(map(data => {
        this.username = email;
        this.isLoggedIn = true;
        localStorage.setItem(AuthService.AUTH_KEY, 'Bearer ' + data['token']);
        return { username: email, accessToken: data['token'] };
      }));
  }

  public getUser(): Observable<User> {
    if (this.user) {
      return of(this.user);
    }

    return this.verifyAuthentication();
  }

  /**
   * Verifies This user authentication.
   * not like getUser, that can return a user from the cache,
   * this method returns only responses from the server.
   * If a request has already been sent, it would not send a new request,
   * but rather return the observable of the old one.
   */
  public verifyAuthentication(): Observable<User> {
    // If a request has already been sent, return it's observable.
    if (this.userObservable$) {
      return this.userObservable$;
    }

    if (!this.hasAuthorization()) {
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': this.getAuthToken(),
      'Content-Type': 'application/json',
    });

    this.userObservable$ = this.httpClient.get(environment.SERVER_ADDRESS + '/user', { headers: headers })
      .pipe(map(data => {
        this.user = User.parseJson(data);
        localStorage.setItem(AuthService.USERNAME_KEY, data['email']);
        return this.user;
      }),
      finalize(() => {
        // clear the Request observable, so than on the next call to this function,
        // a new request will be sent, and a new observable will be created
        this.userObservable$ = null;
      }),
      share()
      );

    return this.userObservable$;
  }

  public getCachedUsername(): string {
    if (this.user && this.user.name) {
      return this.user.name;
    }

    if (this.username) {
      return this.username;
    }

    if (this.getLocalStorageUsername()) {
      this.username = this.getLocalStorageUsername();
      return this.username;
    }

    return null;
  }

  public isUserAdmin(): boolean {
    return this.user.isAdmin;
  }

  public clearAuthorization() {
    sessionStorage.clear();
    localStorage.clear();
  }

  public hasAuthorization(): boolean {
    const key = localStorage.getItem(AuthService.AUTH_KEY);
    return key != null && key.startsWith('Bearer');
  }

  public getAuthToken(): string {
    return localStorage.getItem(AuthService.AUTH_KEY);
  }

  public getLocalStorageUsername(): string {
    return localStorage.getItem(AuthService.USERNAME_KEY);
  }

  public logout(extras?: NavigationExtras) {
    this.isLoggedIn = false;
    this.user = null;
    this.clearAuthorization();
    this.userLogout.emit();
    this.router.navigate([AuthService.LOGIN_URL], extras).then(() => {
      window.location.reload(false);
    });
  }
}
