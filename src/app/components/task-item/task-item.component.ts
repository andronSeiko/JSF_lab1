import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/models/status.enum'; // або інший шлях до enum
import { FormsModule } from '@angular/forms'; // додай це

@Component({
    selector: 'app-task-item',
    templateUrl: './task-item.component.html',
    standalone: false,
    styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() statusChanged = new EventEmitter<{ id: number, status: TaskStatus }>();
  @Output() taskEdited: EventEmitter<Task> = new EventEmitter<Task>(); // подія для редагування
  @Output() taskDeleted: EventEmitter<number> = new EventEmitter<number>(); // подія для видалення
  TaskStatus = TaskStatus;
  deleteTask(id: number | undefined): void {
    if (!id) return; // Якщо id відсутній — виходимо
    this.taskDeleted.emit(id); // Викликаємо подію при натисканні кнопки "Видалити"
  }
  getStatusClasses() {
    return {
      'done': this.task.status === TaskStatus.DONE,
      'todo': this.task.status === TaskStatus.TODO,
      'in_progress': this.task.status === TaskStatus.IN_PROGRESS
    };
  }
  updateStatus(event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value as TaskStatus;
    this.task.status = newStatus;
    this.statusChanged.emit({ id: this.task.id!, status: newStatus });
  }
  editTask(): void {
    this.taskEdited.emit(this.task);
  }




}
