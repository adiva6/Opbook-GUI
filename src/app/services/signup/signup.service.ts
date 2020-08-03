import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {HttpHandler} from '../../utils/http/http-handler';

@Injectable()
export class SignupService {
  constructor(private httpHandler: HttpHandler) {
  }

  public signup(user: User): Observable<User> {
    return this.httpHandler.post(environment.SERVER_ADDRESS, 'sign-up', user.serialize()).pipe(
      map(User.parseJson)
    );
  }
}
