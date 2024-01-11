import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-application-question-dialog',
  templateUrl: './application-question-dialog.component.html',
  styleUrls: ['./application-question-dialog.component.css']
})
export class ApplicationQuestionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ApplicationQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

    questions: Object[] = this.data.info.questions;
    name: string = this.data.info.applicantName;
    email: string = this.data.info.applicantEmail;
    course: string = this.data.info.courseCode;

  ngOnInit(): void {

  }

}
