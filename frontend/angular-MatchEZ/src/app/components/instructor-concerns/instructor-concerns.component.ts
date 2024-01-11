import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewConcernComponent } from '../view-concern/view-concern.component';
import { ConcernsService } from '../../services/concerns.service'
@Component({
  selector: 'app-instructor-concerns',
  templateUrl: './instructor-concerns.component.html',
  styleUrls: ['./instructor-concerns.component.css']
})
export class InstructorConcernsComponent implements OnInit {

  displayedColumns: string[] = ["title", "course", "instructor", "actions"]

  pendingData: Object[];
  historyData: Object[];
  constructor(public dialog: MatDialog, public concernService: ConcernsService) { }

  ngOnInit(): void {
    this.getPending();
    this.getHistory();
  }

  openDialog(info: Object) {
    const dialogRef = this.dialog.open(ViewConcernComponent, {
      data: {info: info}
    });
  }

  getPending(): void {
    this.concernService.getConcerns(false).subscribe(data => {
      if(data.message != undefined){
        this.pendingData = [];
        return;
      }
      this.pendingData = data;
    });
  }

  getHistory(): void {
    this.concernService.getConcerns(true).subscribe(data => {
      if(data.message != undefined){
        this.historyData = [];
        return;
      }
      this.historyData = data;
    });
  }
}
