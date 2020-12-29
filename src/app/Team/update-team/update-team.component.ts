import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Team} from '../team';
import {TeamService} from '../team.service';
import {Customer} from '../../Customer/customer';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {
  team: Team = new Team();
  submitted = false;
  id: number;

  constructor(private es: TeamService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.es.getTeam(this.id)
      .subscribe(data => {
        console.log(data);
        this.team = data;
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateTeam();
  }

  updateTeam() {
    this.es.updateTeam(this.id, this.team)
      .subscribe(data => {
        console.log(data);
        this.gotoList();
      }, error => console.log(error));
  }

  gotoList() {
    this.router.navigate(['/teams']);
  }
}
