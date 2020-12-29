import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './Customer/customer-list/customer-list.component';
import { CreateCustomerComponent } from './Customer/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './Customer/update-customer/update-customer.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {ProjectListComponent} from './Project/project-list/project-list.component';
import {CreateProjectComponent} from './Project/create-project/create-project.component';
import {UpdateProjectComponent} from './Project/update-project/update-project.component';
import {EmployeeListComponent} from './Employee/employee-list/employee-list.component';
import {CreateEmployeeComponent} from './Employee/create-employee/create-employee.component';
import {UpdateEmployeeComponent} from './Employee/update-employee/update-employee.component';
import {TaskListComponent} from './Task/task-list/task-list.component';
import {UpdateTaskComponent} from './Task/update-task/update-task.component';
import {CreateTaskComponent} from './Task/create-task/create-task.component';
import {TeamListComponent} from './Team/team-list/team-list.component';
import {CreateTeamComponent} from './Team/create-team/create-team.component';
import {UpdateTeamComponent} from './Team/update-team/update-team.component';
const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
  { path: 'add-customers', component: CreateCustomerComponent },
  { path: 'update-customers/:id', component: UpdateCustomerComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'add-projects', component: CreateProjectComponent },
  { path: 'update-projects/:id', component: UpdateProjectComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'add-employees', component: CreateEmployeeComponent },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'add-tasks', component: CreateTaskComponent },
  { path: 'update-tasks/:id', component: UpdateTaskComponent },
  { path: 'teams', component: TeamListComponent },
  { path: 'add-teams', component: CreateTeamComponent },
  { path: 'update-teams/:id', component: UpdateTeamComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: BoardAdminComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
