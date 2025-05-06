import {Task} from '../models/task.model';
import {TaskStatus} from '../models/status.enum';

export const tasks: Task[] = [
  {
    id: 0,
    title: 'Встановити Angular',
    assignee: 'Андрій',
    dueDate: '2025-03-21',
    status: TaskStatus.DONE
  },
  {
    id: 1,
    title: 'Ознайомитися з компонентами',
    description: 'Ознайомитися з компонентами та оглянути взаємодію між ними',
    assignee: 'Андрій',
    dueDate: '2025-03-21',
    status: TaskStatus.IN_PROGRESS
  },
  {
    id: 2,
    title: 'Ознайомитися Control Flow',
    description: 'Ознайомитися з новим та старим підходом Control Flow',
    assignee: 'Андрій',
    dueDate: '2025-03-21',
    status: TaskStatus.DONE
  },
  {
    id: 3,
    title: 'Ознайомитися Pipe',
    description: 'Ознайомитися з pipe',
    assignee: 'Андрій',
    dueDate: '2025-03-21',
    status: TaskStatus.TODO
  },
];
