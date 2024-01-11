import { Component, OnInit, Input} from '@angular/core';
import {FetchApplicationsService} from '../../services/fetch-applications.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ApplicationQuestionDialogComponent } from '../application-question-dialog/application-question-dialog.component';


@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.css']
})
export class ApplicationTableComponent implements OnInit {

  displayedColumns: string[] = ['Applicant', 'Email', 'Status', 'Hours', "Course_Rank", 'Questions'];
  @Input() course: string;
  dataSource = [];

  constructor(private fetchService: FetchApplicationsService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getApplicantData();
  }

  openDialog(info: Object) {
    const dialogRef = this.dialog.open(ApplicationQuestionDialogComponent, {
      data: {info: info}
    });
  }

  getApplicantData(){
    this.fetchService.getApplications(this.course).subscribe(data => {
      this.dataSource = data;
    })
  }

}
