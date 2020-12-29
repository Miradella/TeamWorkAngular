import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../token-storage.service';
import {IDatePickerConfig} from 'ng2-date-picker';
import {Moment} from 'moment';
import {Team} from '../../Team/team';
import {TeamService} from '../../Team/team.service';
import {EmployeeService} from '../employee.service';
import {Employee} from '../employee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  empoyee: any;
  form1: FormGroup;
  teams: Observable<Team[]>;
  submitted = false;
  currentUser: any;
  myGroup: any;
  public config: IDatePickerConfig = {
    format: 'DD.MM.YYYY',
    firstDayOfWeek: 'mo'

  };
  public displayDate: Moment | string;

  constructor(private es: EmployeeService,
              private ts: TeamService,
              private token: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.reloadData();
    this.form1 = new FormGroup({
      name: new FormControl(null, Validators.required),
      birthday: new FormControl(null, Validators.required),
      team: new FormControl(null, Validators.required)
    });
  }

  get form(): FormGroup {
    return this.form1;
  }

  reloadData() {
    this.teams = this.ts.getTeamsList();
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
    this.es.createEmployee(this.empoyee).subscribe(data => {
      console.log(data);
      this.gotoList();
    }, error => console.log(error));
    this.empoyee = new Employee();
    this.gotoList();
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
