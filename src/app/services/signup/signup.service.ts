import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class SignupService {
  constructor(private httpClient: HttpClient) {
  }

  public signup(user: User): Observable<User> {
    return this.httpClient.post(environment.SERVER_ADDRESS + '/sign-up', user.serialize()).pipe(
      map(User.parseJson)
    );
  }
}
