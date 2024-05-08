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
  addPost(newPost: Post): Observable<Post> {
    return this._HttpClient.post<Post>("http://localhost:5017/api/Posts", newPost);
  }
  DeletePost(postid:number): Observable<Post> {
    return this._HttpClient.delete<Post>("http://localhost:5017/api/Posts/"+postid);
  }
  EditPost(postid: number, updatedPost: Post): Observable<Post> {
    return this._HttpClient.put<Post>("http://localhost:5017/api/Posts/" + postid, updatedPost);
  }
  getReactsNum(postid:number):Observable<any>{
    return this._HttpClient.get<any>(`http://localhost:5017/api/Posts/reactions/`+postid);
  }
}
