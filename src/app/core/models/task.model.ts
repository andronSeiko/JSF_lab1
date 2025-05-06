import { TaskStatus } from './status.enum';

export interface Task {
  id?: number; // необов’язковий для POST
  title: string;
  description?: string;
  assignee: string;
  dueDate: string; // дата як string
  status: TaskStatus;
}
