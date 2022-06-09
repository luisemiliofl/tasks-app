import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AppTask } from './models/app-task.model';
import { DialogData } from './models/dialog-data.model';
import { TaskService } from './services/task.service';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tasks-app';
  incompleteTasks: AppTask[] = [];
  completedTasks: AppTask[] = [];
  isLoading = false;

  constructor(public dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.taskService.getTasks('complete').subscribe((res: AppTask[]) => {
      this.isLoading = false;
      this.completedTasks = res.filter((task) => task.status);
      this.incompleteTasks = res.filter((task) => !task.status);
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: {
        dialogTitle: 'Add task',
        dialogButton: 'ADD',
      },
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result) {
        this.isLoading = true;
        this.taskService.addTask(result.task, new Date()).subscribe((res) => {
          this.isLoading = false;
          this.incompleteTasks.push(res);
        });
      }
    });
  }

  openEditTask(task: AppTask): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: {
        dialogTitle: 'Edit task',
        dialogButton: 'SAVE',
        task: task.description,
      },
    });

    dialogRef.afterClosed().subscribe((res: DialogData) => {
      if (res) {
        const editedTask: AppTask = { ...task, description: res.task };
        this.isLoading = true;
        this.taskService.editTask(editedTask).subscribe(() => {
          this.isLoading = false;
          const aux = this.incompleteTasks.find(
            (task) => task.id === editedTask.id
          );
          if (aux) {
            this.incompleteTasks[this.incompleteTasks.indexOf(aux)] =
              editedTask;
          }
        });
      }
    });
  }

  editTask(task: AppTask): void {
    if (task) {
      this.isLoading = true;
      this.taskService.editTask(task).subscribe(() => {
        this.isLoading = false;
        if (task.status) {
          this.completedTasks.push(task);
          this.incompleteTasks.splice(this.incompleteTasks.indexOf(task), 1);
        } else {
          this.incompleteTasks.push(task);
          this.completedTasks.splice(this.completedTasks.indexOf(task), 1);
        }
      });
    }
  }

  removeTask(task: AppTask): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Remove task',
        description: 'Are you sure you want to remove this task?',
        okText: 'REMOVE',
        koText: 'CANCEL',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.isLoading = true;
        this.taskService.removeTask(task.id).subscribe(() => {
          this.isLoading = false;
          this.completedTasks.splice(this.completedTasks.indexOf(task), 1);
        });
      }
    });
  }
}
