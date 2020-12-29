import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Team} from './team';
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url = 'http://localhost:8080/api/teams/';

  constructor(private http: HttpClient) { }

  getTeam(id: number): Observable<any> {
    return this.http.get(`${this.url}${id}`);
  }

  createTeam(team: Team): Observable<any> {
    return this.http.post(`${this.url}`, team);
  }

  updateTeam(id: number, value: any): Observable<any> {
    return this.http.put(`${this.url}${id}`, value);
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete(`${this.url}${id}`, { responseType: 'text' });
  }

  getTeamsList(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
}

