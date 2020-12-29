import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../token-storage.service';
import {IDatePickerConfig} from 'ng2-date-picker';
import {Moment} from 'moment';
import {Team} from '../../Team/team';
import {TeamService} from '../../Team/team.service';
import {EmployeeService} from '../employee.service';
import {Employee} from '../employee';
import {Project} from '../../Project/project';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  empoyee: any;
  form1: FormGroup;
  teams: Observable<Team[]>;
  submitted = false;
  currentUser: any;
  myGroup: any;
  id: any;
  public config: IDatePickerConfig = {
    format: 'DD.MM.YYYY',
    firstDayOfWeek: 'mo'

  };
  public displayDate: Moment | string;
  constructor(private es: EmployeeService,
              private ts: TeamService,
              private route: ActivatedRoute,
              private token: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.teams = this.ts.getTeamsList();
    this.form1 = new FormGroup({
      name: new FormControl(null, Validators.required),
      birthday: new FormControl(null, Validators.required),
      team: new FormControl(null, Validators.required)
    });
    this.empoyee = new Employee();
    this.id = this.route.snapshot.params['id'];

    this.es.getEmployee(this.id)
      .subscribe(data => {
        console.log(data);
        this.form1.setValue({
          name: data.name,
          birthday: data.birthday,
          team: data.team.teamId
        });
      }, error => console.log(error));
  }

  get form(): FormGroup {
    return this.form1;
  }

  newEmployee(): void {
    this.submitted = false;
  }

  save() {
    this.empoyee = {
      birthday: this.Birthday.value,
      name: this.Name.value,
      team: {
        teamId: this.getTeam.value
      }
    };
    console.log(JSON.stringify(this.empoyee));
    this.es.updateEmployee (this.id, this.empoyee).subscribe(data => {console.log(data);
                                                                      this.gotoList();
    }, error => console.log(error));
    this.empoyee = new Employee();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }

  onSelectTeam(event) {
    this.form.get('team').setValue(event.target.value, {onlySelf: true});
  }

  get Birthday() {
    return this.form.get('birthday');
  }

  get Name() {
    return this.form.get('name');
  }
  get getTeam() {
    return this.form.get('team');
  }
}
