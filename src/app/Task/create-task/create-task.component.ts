import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Customer} from '../../Customer/customer';
import {CustomerServiceService} from '../../Customer/customer-service.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../token-storage.service';
import {formatDate} from '@angular/common';
import {IDatePickerConfig} from 'ng2-date-picker';
import {Moment} from 'moment';
import {Team} from '../../Team/team';
import {TeamService} from '../../Team/team.service';
import {TaskService} from '../task.service';
import {ProjectService} from '../../Project/project.service';
import {Project} from '../../Project/project';
import {Employee} from '../../Employee/employee';
import {EmployeeService} from '../../Employee/employee.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  task: any;
  form1: FormGroup;
  projects: Observable<Project[]>;
  employees: Observable<Employee[]>;
  submitted = false;
  currentUser: any;
  myGroup: any;
  public displayDate: Moment | string;

  constructor(private ts: TaskService,
              private ps: ProjectService,
              private es: EmployeeService,
              private token: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.reloadData();
    this.form1 = new FormGroup({
      project: new FormControl(null, Validators.required),
      taskName: new FormControl(null, Validators.required),
      deadline: new FormControl(null, Validators.required),
      employee: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  get form(): FormGroup {
    return this.form1;
  }

  reloadData() {
    this.projects = this.ps.getProjectsList();
  }

  newEmployee(): void {
    this.submitted = false;
  }

  save() {
    this.task = {
      priority: this.Priority.value,
      deadline: this.Deadline.value,
      project: {
        projectId: this.Project.value
      },
      employee: {
        employeeId: this.Employee.value
      },
      taskName: this.TaskName.value,
      description: this.Description.value
    };
    console.log(JSON.stringify(this.task));
    this.ts.createTask(this.task).subscribe(data => {
      console.log(data);
      this.gotoList();
    }, error => console.log(error));
    this.task = new Team();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/tasks']);
  }

  onSelectProject(event) {
    this.form.get('project').setValue(event.target.value, {onlySelf: true});
    this.ps.getProject(this.Project.value)
      .subscribe(data => {
          console.log(data);
          this.es.getEmployeesListbyTeam(data.team.teamId)
            .subscribe(
              datan => {
                console.log(datan);
                this.employees = datan;
              },
              error => console.log(error));
        },
        error => console.log(error));
  }

  onSelectEmployee(event) {
    this.form.get('team').setValue(event.target.value, {onlySelf: true});
  }

  get Project() {
    return this.form.get('project');
  }

  get Priority() {
    return this.form.get('priority');
  }

  get Deadline() {
    return this.form.get('deadline');
  }

  get TaskName() {
    return this.form.get('taskName');
  }

  get Employee() {
    return this.form.get('employee');
  }

  get Description() {
    return this.form.get('description');
  }
}
