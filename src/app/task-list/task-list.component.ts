import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppTask } from '../models/app-task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() taskList: AppTask[] = [];
  @Input() icon: 'edit' | 'delete' = 'edit';
  @Input() title: string = '';
  @Input() emptyStateMessagge: string = '';
  @Output() selectedTask = new EventEmitter<AppTask>();
  @Output() checkValueChange = new EventEmitter<AppTask>();

  constructor() {}

  ngOnInit(): void {}

  taskActionEvent(task: AppTask) {
    this.selectedTask.next(task);
  }

  onCheckValueChange(task: AppTask) {
    this.checkValueChange.next(task);
  }
}
