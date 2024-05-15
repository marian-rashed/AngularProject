import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Replay } from '../Interfaces/replay';
import { UserData } from '../Interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private httpclient:HttpClient) { }

   getUserIds(loggedInUserId: string|any): Observable<UserData[]> {
    return this.httpclient.get<UserData[]>(`http://localhost:5017/api/Account/unfollow/${loggedInUserId}`);
  }

  
}


