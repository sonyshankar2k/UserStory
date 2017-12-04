import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';
import { HttpService } from './http';
import { UserStory } from '../entities/userStory.entity';

@Injectable()
export class UserStoryService {

  constructor(
    private http: HttpService
  ) {

  }
  getAllUserData(): Observable<any> {
    return this.http
    .get('posts')
    .map((res: Response) => {
        return res.json();
    });
  }
}
