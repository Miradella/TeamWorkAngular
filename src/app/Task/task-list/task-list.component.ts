import { Observable } from 'rxjs';
import { Task } from '../task';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import {TokenStorageService} from '../../token-storage.service';
import {UserService} from '../../user.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  currentUser: any;
  constructor(private es: TaskService,
              private router: Router,
              private token: TokenStorageService,
              private userService: UserService) {}

  ngOnInit() {

    this.currentUser = this.token.getUser();
    this.reloadData();
  }

  reloadData() {
    this.es.getTasksList().subscribe(data => {
        this.tasks = data;
        console.log(JSON.stringify(data));
      },
      error => console.log(error));

  }

  deleteTask(id: number) {
    this.es.deleteTask(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateTask(id: number){
    this.router.navigate(['update-tasks', id]);
  }
  addTask(){
    this.router.navigate(['add-tasks']);
  }
}
