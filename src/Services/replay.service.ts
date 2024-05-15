import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Replay } from '../Interfaces/replay';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReplayService {

  constructor(private _HttpClient:HttpClient) { }

  getRepliesForComment(commentId: number): Observable<Replay[]> {
    return this._HttpClient.get<Replay[]>(`http://localhost:5017/api/Replay/comment/${commentId}`);
  }

  addReplay(newReplay: Replay): Observable<Replay> {
    return this._HttpClient.post<Replay>("http://localhost:5017/api/Replay", newReplay);
  }

  editReplay(replayId: number, updatedReplay: Replay): Observable<Replay> {
    return this._HttpClient.put<Replay>(`http://localhost:5017/api/Replay/${replayId}`, updatedReplay);
  }

  deleteReplay(replayId: number): Observable<Replay> {
    return this._HttpClient.delete<Replay>(`http://localhost:5017/api/Replay/${replayId}`);
  }
  replyPost(replayId: number): Observable<Replay> {
    return this._HttpClient.delete<Replay>(`http://localhost:5017/api/Replay/${replayId}`);
  }
}
