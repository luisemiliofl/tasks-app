import { AppTask } from './app-task.model';

export interface GenericServerResponse {
  message: string;
  taskId: number;
  tasks: AppTask[];
  task: AppTask;
}
