import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Task} from './task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost:8080/api/tasks/';

  constructor(private http: HttpClient) { }

  getTask(id: number): Observable<any> {
    return this.http.get(`${this.url}${id}`);
  }

  createTask(task: Task): Observable<any> {
    return this.http.post(`${this.url}`, task);
  }

  updateTask(id: number, value: any): Observable<any> {
    return this.http.put(`${this.url}${id}`, value);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.url}${id}`, { responseType: 'text' });
  }

  getTasksList(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
}

