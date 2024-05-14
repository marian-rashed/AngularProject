import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.httpclient.get<any[]>(`http://localhost:5017/api/posts/user/${loggedInUserId}`)
  }
  editUserData(updatesUserData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const options = { headers: headers }; // Include headers in options
    return this.httpclient.patch<any>(`http://localhost:5017/api/Account`, updatesUserData, options);
  }
  
}
