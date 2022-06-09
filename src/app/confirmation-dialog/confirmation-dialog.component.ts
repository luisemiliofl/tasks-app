import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  title?: string;
  description?: string;
  okText?: string;
  koText?: string;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      description: string;
      okText: string;
      koText: string;
    }
  ) {
    this.title = data.title;
    this.description = data.description;
    this.okText = data.okText;
    this.koText = data.koText;
  }

  ngOnInit(): void {}
}
