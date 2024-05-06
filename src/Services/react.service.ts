import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { React } from '../Interfaces/react';
@Injectable({
  providedIn: 'root'
})
export class ReactService {

  constructor(private _HttpClient:HttpClient) { }
  getReactsForPost(postId: number): Observable<React[]> {
    return this._HttpClient.get<React[]>(`http://localhost:5017/api/React/all?postId=${postId}`);
  }
  addReact(newReact: React): Observable<React> {
    return this._HttpClient.post<React>("http://localhost:5017/api/React", newReact);
  }
  
}
