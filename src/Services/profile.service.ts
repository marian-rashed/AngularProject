import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../Interfaces/user-data';
import { Post } from '../Interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpclient:HttpClient ) { }

  GetUserData(loggedInUserId: string|any): Observable<any> {
    return this.httpclient.get<any>(`http://localhost:5017/api/profile/${loggedInUserId}`);
  }

  GetUserPosts(loggedInUserId: string|any):Observable<any[]>
  {
    return this.httpclient.get<any[]>(`http://localhost:5017/api/posts/user/8b475933-7115-4eb0-894c-124717a5d220`)
  }
}
