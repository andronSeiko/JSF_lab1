import { Pipe, PipeTransform } from '@angular/core';
import {tasks} from '../../core/moc_data/tasks';
import { Task} from '../../core/models/task.model'
import { TaskStatus} from '../../core/models/status.enum'

@Pipe({
    name: 'statusFilter',
    standalone: false,
    pure: false
})


export class StatusFilterPipe implements PipeTransform {
  transform(tasks: Task[], status: TaskStatus | 'all'): Task[] {
    if (!tasks) {
      return [];
    }

    if (status === 'all' || status === null || status === undefined) {
      return tasks;
    }

    return tasks.filter((task: Task) => task.status === status);
  }
}


