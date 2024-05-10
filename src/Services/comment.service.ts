import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../Interfaces/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _HttpClient: HttpClient) { }
  getCommentForPost(postId: number): Observable<Comment[]> {
    return this._HttpClient.get<Comment[]>(`http://localhost:5017/api/Comment/post/${postId}`);
  }
  addComment(newComment: Comment): Observable<Comment> {
    return this._HttpClient.post<Comment>("http://localhost:5017/api/Comment", newComment);
  }
  EditComment(commentId: number, updatedComment: Comment): Observable<Comment> {
    return this._HttpClient.put<Comment>(`http://localhost:5017/api/comment?id=${commentId}`, updatedComment);
  }
  DeleteComment(commentId: number): Observable<Comment> {
    return this._HttpClient.delete<Comment>(`http://localhost:5017/api/comment/${commentId}`);
  }
}
