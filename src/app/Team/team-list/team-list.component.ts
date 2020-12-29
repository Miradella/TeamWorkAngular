import { Observable } from 'rxjs';
import { Team } from '../team';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import {TokenStorageService} from '../../token-storage.service';
import {UserService} from '../../user.service';
@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[];
  currentUser: any;
  constructor(private es: TeamService,
              private router: Router,
              private token: TokenStorageService,
              private userService: UserService) {}

  ngOnInit() {

    this.currentUser = this.token.getUser();
    this.reloadData();
  }

  reloadData() {
    this.es.getTeamsList().subscribe(data => {
        this.teams = data;
        console.log(JSON.stringify(data));
      },
      error => console.log(error));

  }

  deleteTeam(id: number) {
    this.es.deleteTeam(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateTeam(id: number){
    this.router.navigate(['update-teams', id]);
  }
  addTeam(){
    this.router.navigate(['add-teams']);
  }
}
