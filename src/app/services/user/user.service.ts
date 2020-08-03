import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {HttpHandler} from '../../utils/http/http-handler';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserService {
  constructor(private httpHandler: HttpHandler) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpHandler.get(environment.SERVER_ADDRESS, 'students').pipe(
      map((rawUsers: any[]) => rawUsers.map(User.parseJson))
    );
  }
}
