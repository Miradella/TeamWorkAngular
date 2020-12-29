import {Project} from '../project';
import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from '../project.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerServiceService} from '../../Customer/customer-service.service';
import {TokenStorageService} from '../../token-storage.service';
import {Observable} from 'rxjs';
import {Customer} from '../../Customer/customer';
import {TeamService} from '../../Team/team.service';
import {Team} from '../../Team/team';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  project: any;
  form1: FormGroup;
  customers: Observable<Customer[]>;
  teams: Observable<Team[]>;
  submitted = false;
  currentUser: any;
  myGroup: any;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router,
              private es: ProjectService,
              private cs: CustomerServiceService,
              private ts: TeamService,
              private token: TokenStorageService) {
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.customers = this.cs.getCustomersList();
    this.teams = this.ts.getTeamsList();
    this.form1 = new FormGroup({
      projectname: new FormControl(null, Validators.required),
      projectstart: new FormControl(null, Validators.required),
      deadline: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      customer: new FormControl(null, Validators.required),
      team: new FormControl(null, Validators.required)
    });
    this.project = new Project();
    this.id = this.route.snapshot.params.id;

    this.es.getProject(this.id)
      .subscribe(data => {
        console.log(data);
        this.form1.setValue({
          projectname: data.projectName,
          projectstart: data.projectstart,
          deadline: data.deadline,
          priority: data.priority,
          customer: data.customer.id,
          team: data.team.teamId
        });
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateCustomer();
  }

  updateCustomer() {
    this.project = {
      projectName: this.ProjectName.value,
      priority: this.Priority.value,
      projectstart: this.ProjectStart.value,
      deadline: this.Deadline.value,
      customer: {
        id: this.getCustomer.value
      },
      team: {
        teamId: this.getTeam.value
      }
    };
    console.log(JSON.stringify(this.project));
    this.es.updateProject(this.id, this.project).subscribe(data =>
    {console.log(data);
     this.gotoList();
    }, error => console.log(error));
    this.project = new Project();

  }

  gotoList() {
    this.router.navigate(['/projects']);
  }

  onSelectCustomer(event) {
    this.form.get('customer').setValue(event.target.value, {onlySelf: true});
  }

  onSelectTeam(event) {
    this.form.get('team').setValue(event.target.value, {onlySelf: true});
  }
  get ProjectName() {
    return this.form.get('projectname');
  }

  get Priority() {
    return this.form.get('priority');
  }

  get form(): FormGroup {
    return this.form1;
  }

  get Deadline() {
    return this.form.get('deadline');
  }

  get ProjectStart() {
    return this.form.get('projectstart');
  }

  get getCustomer() {
    return this.form.get('customer');
  }

  get getTeam() {
    return this.form.get('team');
  }
}

