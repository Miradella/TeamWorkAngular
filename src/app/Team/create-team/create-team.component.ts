import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Team} from '../team';
import {TeamService} from '../team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  team: Team = new Team();
  submitted = false;

  constructor(private es: TeamService,
              private router: Router) {
  }

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.team = new Team();
  }

  save() {
    this.es.createTeam(this.team)
      .subscribe(data => {
        console.log(data);
        this.gotoList();
      }, error => console.log(error));
    this.team = new Team();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/teams']);
  }
}
