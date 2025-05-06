import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/models/status.enum';


@Component({
    selector: 'app-task-list',
    standalone: false,
    templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  myTasks$!: Observable<Task[]>;
  selectedStatus!: TaskStatus | 'all';
  editingTask: Task | null = null;
  constructor(private taskService: TaskService) {
  }
  ngOnInit(): void {
    this.myTasks$ = this.taskService.getTasks();
  }
  loadTasks(status?: string): void {
    this.myTasks$ = this.taskService.getTasks(status);
  }
  addTask(task: Task): void {
    if (this.editingTask) {
      if (!task.id) return;
      this.taskService.updateTask(task.id, task).subscribe({
        next: () => this.loadTasks(),
        error: error => console.log(error),
      })
      this.editingTask = null;
    } else {
      this.taskService.createTask(task).subscribe({
        next: () => this.loadTasks(),
        error: error => console.log(error),
      });
    }
  }
  editTask(task: Task): void {
    this.editingTask = {...task};
  }
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: error => console.log(error),
    });
  }
  onSelected(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    this.selectedStatus = status as TaskStatus | 'all';
    this.loadTasks(this.selectedStatus !== 'all' ? this.selectedStatus : '');
  }
  protected readonly TaskStatus = TaskStatus;
}
