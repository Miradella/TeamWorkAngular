import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Project} from './project';
import {FormControl} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = 'http://localhost:8080/api/projects/';

  constructor(private http: HttpClient) { }

  getProject(id: number): Observable<any> {
    return this.http.get(`${this.url}${id}`);
  }
/*
  createProject(project: Project, id: number): Observable<any> {
    return this.http.post(`${this.url}${id}`, project);
  }
 */
  createProject(project: Project): Observable<any> {
    return this.http.post(`${this.url}`, project);
  }
  updateProject(id: number, value: any): Observable<any> {
    return this.http.put(`${this.url}${id}`, value);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.url}${id}`, { responseType: 'text' });
  }

  getProjectsList(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
}
