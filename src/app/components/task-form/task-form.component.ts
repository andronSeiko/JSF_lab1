import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { TaskStatus } from '../../core/models/status.enum';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskFormValidator } from '../../share/task-form.validator';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  standalone: false
})
export class TaskFormComponent implements OnChanges {


  public TaskStatus = TaskStatus;



  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', TaskFormValidator.forbiddenWordsValidator(['React', 'Vue'])),
    dueDate: new FormControl('', [Validators.required, TaskFormValidator.dateValidator]),
    assignee: new FormControl('', Validators.required),
    status: new FormControl(TaskStatus.TODO, Validators.required),
  });




  @Output()taskAdd = new EventEmitter<Task>();

  task!: Task;

  @Input() editTask: Task | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editTask'] && this.editTask) {
      this.taskForm.patchValue(this.editTask);
    }
  }

  addTask(): void {
    if (this.taskForm.valid) {
      let taskData: Partial<Task> & { id?: number } = {
        ...this.taskForm.value,
        id: this.editTask ? this.editTask.id : undefined,
      };

      this.taskAdd.emit(taskData as Task);
      this.taskForm.reset();
    }
  }


  ngOnInit(): void {
    this.task = {
      id: -1,
      title: '',
      description: '',
      dueDate: new Date().toISOString(),
      assignee: '',
      status: TaskStatus.TODO
    };
  }

}


