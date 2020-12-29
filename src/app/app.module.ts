import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateCustomerComponent } from './Customer/create-customer/create-customer.component';
import { CustomerListComponent } from './Customer/customer-list/customer-list.component';
import { UpdateCustomerComponent } from './Customer/update-customer/update-customer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {authInterceptorProviders} from './auth.interceptor';
import { CreateProjectComponent } from './Project/create-project/create-project.component';
import { ProjectListComponent } from './Project/project-list/project-list.component';
import { UpdateProjectComponent } from './Project/update-project/update-project.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import { CreateTeamComponent } from './Team/create-team/create-team.component';
import { TeamListComponent } from './Team/team-list/team-list.component';
import { UpdateTeamComponent } from './Team/update-team/update-team.component';
import { CreateEmployeeComponent } from './Employee/create-employee/create-employee.component';
import { EmployeeListComponent } from './Employee/employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './Employee/update-employee/update-employee.component';
import { CreateTaskComponent } from './Task/create-task/create-task.component';
import { TaskListComponent } from './Task/task-list/task-list.component';
import { UpdateTaskComponent } from './Task/update-task/update-task.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateCustomerComponent,
    CustomerListComponent,
    UpdateCustomerComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BoardAdminComponent,
    CreateProjectComponent,
    ProjectListComponent,
    UpdateProjectComponent,
    CreateTeamComponent,
    TeamListComponent,
    UpdateTeamComponent,
    CreateEmployeeComponent,
    EmployeeListComponent,
    UpdateEmployeeComponent,
    CreateTaskComponent,
    TaskListComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DpDatePickerModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
