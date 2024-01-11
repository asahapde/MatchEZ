import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchApplicationsService } from '../../services/fetch-applications.service';

@Component({
  selector: 'app-edit-allocation',
  templateUrl: './edit-allocation.component.html',
  styleUrls: ['./edit-allocation.component.css']
})
export class EditAllocationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditAllocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private fetchApplicationsSercive: FetchApplicationsService,
    private router: Router) { }

  courseSelection: string = this.data.info.course;
  typeSelection: string = this.data.info.type.toString();
  hoursInput: string = this.data.info.hrs.toString();

  ngOnInit(): void {

  }

  submit(): void {
    this.dialogRef.close();
    let obj = {
      course: this.courseSelection,
      email: this.data.info.email,
      hrs: this.hoursInput,
      name: this.data.info.name,
      profRank: this.data.info.profRank,
      score: this.data.info.score,
      taRank: this.data.info.taRank,
      type: this.typeSelection
    }
    this.fetchApplicationsSercive.setAllocations(obj, this.data.info.course).subscribe(data => {
      this.refreshTable();
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }

  refreshTable() {
    // save current route first
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }

}
