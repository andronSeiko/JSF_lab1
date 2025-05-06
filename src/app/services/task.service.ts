import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../core/models/task.model'; // або core/models якщо інша структура
import { AppConfig, CONFIG_TOKEN } from '../config/config'; // шляхи можуть бути інші

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG_TOKEN) private config: AppConfig
  ) {}

  getTasks(status?: string): Observable<Task[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);

    return this.http.get<Task[]>(`${this.config.apiUrl}/v1/tasks`, { params: params });
  }

  createTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(`${this.config.apiUrl}/v1/tasks`, newTask);
  }

  updateTask(id: number, updateTask: Task): Observable<Task> {
    const task = { id, ...updateTask };
    return this.http.put<Task>(`${this.config.apiUrl}/v1/tasks/${id}`, task);
  }

  patchTask(id: number, updateTask: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.config.apiUrl}/v1/tasks/${id}`, updateTask);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.config.apiUrl}/v1/tasks/${id}`);
  }
}
