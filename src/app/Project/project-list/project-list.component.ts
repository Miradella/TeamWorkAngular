import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../token-storage.service';
import {UserService} from '../../user.service';
import {Project} from '../project';
import {ProjectService} from '../project.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  project: Project[];
  currentUser: any;
  constructor(private es: ProjectService,
              private router: Router,
              private token: TokenStorageService,
              private userService: UserService) {}

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.reloadData();
  }

  reloadData() {
    this.es.getProjectsList().subscribe(data => {
        this.project = data;
        console.log(JSON.stringify(data));
      },
      error => console.log(error));
  }

  deleteProject(id: number) {
    this.es.deleteProject(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  projectDetails(id: number){
    this.router.navigate(['update-projects', id]);
  }
  addProject(){
    this.router.navigate(['add-projects']);
  }
}
