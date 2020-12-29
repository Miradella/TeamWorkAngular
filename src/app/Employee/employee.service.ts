import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Employee} from './employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:8080/api/employees/';

  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.url}${id}`);
  }

  createEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.url}`, employee);
  }

  updateEmployee(id: number, value: any): Observable<any> {
    return this.http.put(`${this.url}${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.url}${id}`, { responseType: 'text' });
  }

  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
  getEmployeesListbyTeam(id: any): Observable<any> {
    return this.http.get(`${this.url}team/${id}`);
  }
}

