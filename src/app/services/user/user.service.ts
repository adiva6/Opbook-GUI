import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get('/students').pipe(
      map((rawUsers: any[]) => rawUsers.map(User.parseJson))
    );
  }
}
