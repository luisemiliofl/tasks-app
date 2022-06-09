import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AppTask } from '../models/app-task.model';
import { GenericServerResponse } from '../models/generic-server-response.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  // Add task
  public addTask(description: string, creationDate: Date): Observable<AppTask> {
    const newTask = {
      description,
      creationDate,
    };
    return this.http.post<any>('http://localhost:3000/api/tasks', newTask).pipe(
      map((res) => {
        return {
          id: res.task._id,
          description: res.task.description,
          creationDate: res.task.creationDate,
          status: res.task.status,
        } as AppTask;
      })
    );
  }
  // Remove task
  public removeTask(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/tasks/${id}`);
  }
  // Edit task
  public editTask(task: AppTask): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3000/api/tasks/${task.id}`,
      task
    );
  }

  // Get task, with an option to filter by status
  public getTasks(status?: 'complete' | 'incomplete'): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/tasks').pipe(
      map((res) => {
        return res.tasks.map((task: any) => {
          return {
            id: task._id,
            description: task.description,
            creationDate: task.creationDate,
            status: task.status,
          };
        });
      })
    );
  }
}
