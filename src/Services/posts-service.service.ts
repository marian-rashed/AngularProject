import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../Interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {

  constructor(private _HttpClient:HttpClient) { }

  GetAllPosts():Observable<Post[]>
  {
    return this._HttpClient.get<Post[]>("http://localhost:5017/api/posts");
  }
}
