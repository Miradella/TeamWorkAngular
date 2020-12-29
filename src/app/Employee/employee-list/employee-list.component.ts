import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {TokenStorageService} from '../../token-storage.service';
import {UserService} from '../../user.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  currentUser: any;
  constructor(private es: EmployeeService,
              private router: Router,
              private token: TokenStorageService,
              private userService: UserService) {}

  ngOnInit() {

    this.currentUser = this.token.getUser();
    this.reloadData();
  }

  reloadData() {
    this.es.getEmployeesList().subscribe(data => {
        this.employees = data;
        console.log(JSON.stringify(data));
      },
      error => console.log(error));

  }

  deleteEmployee(id: number) {
    this.es.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }
  addEmployee(){
    this.router.navigate(['add-employees']);
  }
}
