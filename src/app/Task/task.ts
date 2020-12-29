import {Project} from '../Project/project';
import {Employee} from '../Employee/employee';
export class Task {
  taskId: number;
  project: Project;
  taskName: string;
  employee: Employee;
  deadline: string;
  priority: number;
  description: string;
}
