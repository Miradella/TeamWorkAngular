import {Customer} from '../Customer/customer';
import {Team} from '../Team/team';
export class Project {
  projectId: number;
  projectName: string;
  projectstart: string;
  deadline: string;
  priority: number;
  customer: Customer;
  team: Team;
}
