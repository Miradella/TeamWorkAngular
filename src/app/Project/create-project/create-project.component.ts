import {Component, OnInit} from '@angular/core';
import {Project} from '../project';
import {Router} from '@angular/router';
import {ProjectService} from '../project.service';
import {Customer} from '../../Customer/customer';
import {CustomerServiceService} from '../../Customer/customer-service.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../token-storage.service';
import { formatDate } from '@angular/common';
import {IDatePickerConfig} from 'ng2-date-picker';
import {Moment} from 'moment';
import {Team} from '../../Team/team';
import {TeamService} from '../../Team/team.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  project: any;
  form1: FormGroup;
  customers: Observable<Customer[]>;
  teams: Observable<Team[]>;
  submitted = false;
  currentUser: any;
  myGroup: any;
  public config: IDatePickerConfig = {
    format: 'DD.MM.YYYY',
    firstDayOfWeek: 'mo'

  };
  public displayDate: Moment | string;
  constructor(private es: ProjectService,
              private cs: CustomerServiceService,
              private ts: TeamService,
              private token: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.reloadData();
    this.form1 = new FormGroup({
      projectname: new FormControl(null, Validators.required),
      projectstart: new FormControl(null, Validators.required),
      deadline: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      customer: new FormControl(null, Validators.required),
      team: new FormControl(null, Validators.required)
    });
  }

  get form(): FormGroup {
    return this.form1;
  }

  reloadData() {
    this.customers = this.cs.getCustomersList();
    this.teams = this.ts.getTeamsList();
  }

  newEmployee(): void {
    this.submitted = false;
  }

  save() {
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
    this.es.createProject(this.project).subscribe(data => {console.log(data);
      this.gotoList();
    }, error => console.log(error));
    this.project = new Project();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
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
